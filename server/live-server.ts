import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, LiveServerMessage, Modality, Part, Session } from '@google/genai';

// --- Configuration ---
const PORT = 3001;
// ⚠️ SECURITY WARNING: For temporary testing only. 
const GEMINI_API_KEY = "AIzaSyC1Uq8CQqUAJWFZXOPwoH4kiaivesylOFw";

// --- Create the WebSocket Server ---
const wss = new WebSocketServer({ port: PORT });
console.log(`🚀 WebSocket server started on ws://localhost:${PORT}`);

wss.on('connection', (ws: WebSocket) => {
  console.log('✅ New client connected.');
  
  let geminiSession: Session | null = null;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const sendError = (errorMessage: string) => {
    ws.send(JSON.stringify({ error: errorMessage }));
  };

  const initializeGemini = async () => {
    try {
      geminiSession = await ai.live.connect({
        model: 'models/gemini-2.0-flash-live-001',
        config: {
          responseModalities: [Modality.TEXT, Modality.AUDIO],
          speechConfig: {
            languageCode: 'en-US',
          },
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => ws.send(JSON.stringify(message)),
          onerror: (e: ErrorEvent) => {
            console.error('🔴 Gemini Error:', e.message);
            sendError(`Gemini Session Error: ${e.message}`);
          },
          onclose: (e: CloseEvent) => {
            console.log(`🟡 Gemini session closed. Reason: ${e.reason}, Code: ${e.code}`);
          },
        },
      });
      
      console.log('✨ Gemini session initialized for client.');

      // CORRECTED: The 'parts' array is wrapped in a 'turns' array
      await geminiSession.sendClientContent({
        turns: [{ parts: [{ text: "You are a humor checker or assistant teacher who takes the exam of the students. Test the students, check their question answers, and provide their suggestions. After the process ends, give suggestions and provide a final score." }] }]
      });
      console.log('🛠️ Sent initial prompt to Gemini.');

    } catch (error: any) {
      console.error('Failed to initialize Gemini session:', error);
      sendError(`Failed to initialize Gemini session: ${error.message}`);
    }
  };

  initializeGemini();

  ws.on('message', async (message: Buffer) => {
    if (!geminiSession) {
      sendError('Gemini session not ready.');
      return;
    }
    try {
      const clientMessage = JSON.parse(message.toString());
      const parts: Part[] = [];
      if (clientMessage.text) parts.push({ text: clientMessage.text });
      if (clientMessage.audio) parts.push({ inlineData: { mimeType: clientMessage.audio.mimeType, data: clientMessage.audio.data } });
      if (clientMessage.video) parts.push({ inlineData: { mimeType: clientMessage.video.mimeType, data: clientMessage.video.data } });
      
      // CORRECTED: The 'parts' array is wrapped in a 'turns' array
      if (parts.length > 0) await geminiSession.sendClientContent({ turns: [{ parts: parts }] });

    } catch (error: any) {
      console.error('Error processing client message:', error);
      sendError(`Invalid message format: ${error.message}`);
    }
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected.');
    if (geminiSession) {
      geminiSession.close();
      geminiSession = null;
    }
  });

  ws.on('error', (error) => console.error('WebSocket Error:', error));
});