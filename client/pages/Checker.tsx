import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text?: string;
  audioUrl?: string;
}

export default function LiveTutor() {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const ws = useRef<WebSocket | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoInterval = useRef<NodeJS.Timeout | null>(null);
  const audioParts = useRef<string[]>([]);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) return;
    ws.current = new WebSocket('ws://localhost:3001');
    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onerror = (error) => console.error('WebSocket Error:', error);
    ws.current.onmessage = (event) => handleServerMessage(event);
    return () => {
      ws.current?.close();
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        mediaStream.current = stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };
    setupMedia();
    return () => {
      mediaStream.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleServerMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.serverContent) {
      const turn = message.serverContent.modelTurn;
      if (turn?.parts) {
        const part = turn.parts[0];
        if (part.text) setChatLog(prev => [...prev, { sender: 'bot', text: part.text }]);
        if (part.inlineData?.data) audioParts.current.push(part.inlineData.data);
      }
      if (message.serverContent.turnComplete) {
        if (audioParts.current.length > 0) {
          const audioData = audioParts.current.join('');
          const audioBlob = new Blob([Buffer.from(audioData, 'base64')], { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setChatLog(prev => [...prev, { sender: 'bot', audioUrl: url }]);
          audioParts.current = [];
        }
      }
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  
  const sendVideoFrame = () => {
      if (videoRef.current && canvasRef.current && ws.current?.readyState === WebSocket.OPEN) {
          const canvas = canvasRef.current;
          const video = videoRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
              const base64Data = dataUrl.split(',')[1];
              ws.current?.send(JSON.stringify({
                  video: { mimeType: 'image/jpeg', data: base64Data }
              }));
          }
      }
  };

  const startSession = () => {
    if (mediaStream.current && ws.current?.readyState === WebSocket.OPEN) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current);
      mediaRecorder.current.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const base64Data = await blobToBase64(event.data);
          ws.current?.send(JSON.stringify({
            audio: { mimeType: event.data.type, data: base64Data },
          }));
        }
      };
      mediaRecorder.current.start(500);
      videoInterval.current = setInterval(sendVideoFrame, 500);
      setIsSessionActive(true);
    }
  };

  const stopSession = () => {
    mediaRecorder.current?.stop();
    if (videoInterval.current) clearInterval(videoInterval.current);
    setIsSessionActive(false);
  };

  const sendTextMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN && inputText) {
      setChatLog(prev => [...prev, { sender: 'user', text: inputText }]);
      ws.current.send(JSON.stringify({ text: inputText }));
      setInputText('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20' }}>
      <div>
        <h2>Your Camera</h2>
        <video ref={videoRef} autoPlay muted style={{ width: '480px', border: '1px solid black', backgroundColor: 'black' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div>
          <button onClick={startSession} disabled={isSessionActive || !isConnected}>Start Session</button>
          <button onClick={stopSession} disabled={!isSessionActive}>End Session</button>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <h2>Live AI Tutor</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
          {chatLog.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
              <div style={{ display: 'inline-block', padding: '8px 12px', borderRadius: '10px', backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef', color: msg.sender === 'user' ? 'white' : 'black' }}>
                {msg.text && <p>{msg.text}</p>}
                {msg.audioUrl && <audio controls src={msg.audioUrl} />}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a text message..."
            style={{ flexGrow: 1 }}
            onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
          />
          <button onClick={sendTextMessage} disabled={!isConnected}>Send Text</button>
        </div>
      </div>
    </div>
  );
}