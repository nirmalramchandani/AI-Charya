// src/components/checker/ChatbotPanel.js

export default function ChatbotPanel({ initialMessages }) {
  return (
    <div className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-md flex-shrink-0">
      <h3 className="text-lg font-bold text-center mb-4 text-gray-700">AICHARYA CHECKER</h3>
      <div className="space-y-2">
        {initialMessages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg ${msg.from === 'ai' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800 text-right'}`}>
            {msg.text}
          </div>
        ))}
        <div className="text-center pt-4">
          <button className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900">SPEAK</button>
        </div>
      </div>
    </div>
  );
}