// src/components/checker/ChatbotPanel.tsx

import React, { useState, useEffect, useRef } from 'react';

// Define the structure of a chat message
interface Message {
  from: 'ai' | 'user';
  text: string;
}

export default function ChatbotPanel({ initialMessages, isActive }: { initialMessages: Message[], isActive: boolean }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Connect to the WebSocket server only when the panel becomes active
    if (isActive) {
      // --- FIX: Use the secure 'wss://' protocol ---
      // Ngrok provides a wss:// URL. Using ws:// from a https:// site will be blocked by the browser.
      const productionWsUrl = 'wss://5f53c992e7ae.ngrok-free.app/ws/gemini';
      
      console.log(`Attempting to connect to WebSocket at: ${productionWsUrl}`);
      ws.current = new WebSocket(productionWsUrl);

      // --- ENHANCED DEBUGGING ---
      ws.current.onopen = () => {
        console.log('✅ WebSocket connection established successfully.');
      };

      ws.current.onclose = (event) => {
        // This will tell you if the connection closed and why
        console.error('❌ WebSocket connection closed.', `Code: ${event.code}`, `Reason: ${event.reason}`);
      };

      ws.current.onerror = (error) => {
        // This will catch any connection errors
        console.error('❌ WebSocket error observed:', error);
      };

      ws.current.onmessage = (event) => {
        console.log("Received from backend:", event.data); // Log every message
        try {
          const response = JSON.parse(event.data);

          if (response.type === 'text') {
            setMessages((prev) => [...prev, { from: 'ai', text: response.data }]);
          }

          if (response.type === 'audio') {
            console.log("Received audio chunk to play.");
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", event.data, error);
        }
      };

      // Cleanup function to close the connection
      return () => {
        ws.current?.close();
      };
    }
  }, [isActive]); 

  const handleSendMessage = () => {
    if (inputValue.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const messageToSend = { type: 'text_input', payload: inputValue };
      
      console.log("Sending to backend:", JSON.stringify(messageToSend));

      setMessages((prev) => [...prev, { from: 'user', text: inputValue }]);
      ws.current.send(JSON.stringify(messageToSend));
      setInputValue('');
    } else {
      console.error("Could not send. WebSocket not open. Ready state:", ws.current?.readyState);
    }
  };

  return (
    <div className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-md flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-center mb-4 text-gray-700 flex-shrink-0">AICHARYA CHECKER</h3>
      <div ref={chatBodyRef} className="flex-grow space-y-3 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-xl max-w-sm break-words ${msg.from === 'ai' ? 'bg-blue-100 text-blue-900' : 'bg-gray-800 text-white'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {!isActive && (
          <div className="text-center text-gray-500 p-4">
            Chat will begin after student verification...
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t flex-shrink-0 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isActive ? "Type your message..." : "Waiting to start..."}
          disabled={!isActive}
          className="w-full px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-200"
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!isActive}
          className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Send
        </button>
      </div>
    </div>
  );
}