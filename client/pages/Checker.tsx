import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// --- Configuration ---
const API_KEY = "AIzaSyC1Uq8CQqUAJWFZXOPwoH4kiaivesylOFw";
if (!API_KEY) {
  alert("Please add your Gemini API key to the GeminiTestComponent.tsx file.");
}
const genAI = new GoogleGenAI({ apiKey: API_KEY });

interface TestMessage {
  from: 'ai' | 'user';
  text: string;
}

export default function GeminiTestComponent() {
  const [status, setStatus] = useState<'IDLE' | 'CONNECTING' | 'CONNECTED' | 'ERROR'>('IDLE');
  const [messages, setMessages] = useState<TestMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [audioStatus, setAudioStatus] = useState<'OK' | 'FAILED'>('OK'); // State for audio feedback

  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameId = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const streamVideo = () => {
    if (status !== 'CONNECTED' || !sessionRef.current || !videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        if (blob && sessionRef.current) {
          sessionRef.current.sendRealtimeInput({ media: blob });
        }
      }, 'image/jpeg', 0.7);
    }
    animationFrameId.current = requestAnimationFrame(streamVideo);
  };

  const startSession = async () => {
    if (sessionRef.current) return;
    setStatus('CONNECTING');
    setAudioStatus('OK');
    setMessages([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const session = await genAI.live.connect({
        model: "models/gemini-1.5-flash-latest",
        config: {
          systemInstruction: {
            parts: [{ text: "You are a helpful test assistant. Respond to user input." }],
            role: "user"
          }
        },
        callbacks: {
          onmessage: (message: any) => {
            try {
              const response = JSON.parse(message.data);
              const geminiResponse = response.content; 
              if (geminiResponse && geminiResponse.text) {
                setMessages((prev) => [...prev, { from: 'ai', text: geminiResponse.text }]);
              }
            } catch (error) {
              console.error("Error parsing server message", error);
            }
          },
          onerror: (err: any) => {
            console.error("Connection error:", err);
            setStatus('ERROR');
          },
          onclose: () => {
            console.log("Connection closed.");
          },
        }
      });
      
      sessionRef.current = session;
      setStatus('CONNECTED');
      
      animationFrameId.current = requestAnimationFrame(streamVideo);

      // --- GRACEFUL AUDIO RECORDER SETUP ---
      if (stream.getAudioTracks().length > 0) {
        try {
          const MimeTypes = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/webm'];
          const supportedMimeType = MimeTypes.find(type => MediaRecorder.isTypeSupported(type));

          if (!supportedMimeType) {
            throw new Error("No supported audio MIME type found for MediaRecorder.");
          }
          
          const options = { mimeType: supportedMimeType };
          
          mediaRecorderRef.current = new MediaRecorder(stream, options);
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0 && sessionRef.current) {
              sessionRef.current.sendRealtimeInput({ media: event.data });
            }
          };
          mediaRecorderRef.current.start(1000);
        } catch (recorderError) {
          console.error("--- MediaRecorder failed to start. Session will continue without audio. ---", recorderError);
          setAudioStatus('FAILED');
        }
      }

    } catch (error) {
      console.error("Failed to start session:", error);
      setStatus('ERROR');
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && sessionRef.current && status === 'CONNECTED') {
      setMessages((prev) => [...prev, { from: 'user', text: inputValue }]);
      sessionRef.current.sendClientContent(inputValue);
      setInputValue('');
    }
  };

  const stopSession = () => {
    cancelAnimationFrame(animationFrameId.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('IDLE');
    setMessages([]);
  };

  const chatBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2>Gemini Live API Test Component</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={startSession} disabled={status !== 'IDLE'}>Start Session</button>
          <button onClick={stopSession} disabled={status === 'IDLE' || status === 'CONNECTING'}>Stop Session</button>
          <p>Status: <b style={{ color: status === 'CONNECTED' ? 'green' : 'orange' }}>{status}</b></p>
        </div>
        
        {audioStatus === 'FAILED' && (
            <p style={{ color: 'red', fontSize: '12px', textAlign: 'center', padding: '5px', background: '#fff0f0', border: '1px solid red', borderRadius: '4px' }}>
              Warning: Audio recording failed. Session will continue with video and text only.
            </p>
        )}

        <div style={{ position: 'relative', width: '100%', backgroundColor: 'black' }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <div ref={chatBodyRef} style={{ height: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
          {messages.length === 0 && <p style={{ color: '#888' }}>Chat log...</p>}
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', marginBottom: '5px' }}>
              <span style={{ 
                background: msg.from === 'user' ? '#007bff' : '#e9e9eb',
                color: msg.from === 'user' ? 'white' : 'black',
                padding: '5px 10px',
                borderRadius: '10px'
              }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={status !== 'CONNECTED'}
            style={{ flex: 1, padding: '8px' }}
          />
          <button onClick={handleSendMessage} disabled={status !== 'CONNECTED'} style={{ marginLeft: '10px' }}>Send</button>
        </div>
      </div>
    </div>
  );
}