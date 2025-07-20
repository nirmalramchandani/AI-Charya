// src/components/checker/TaskDetailsPanel.js

export default function TaskDetailsPanel({ task }) {
  return (
    <div className="p-4 bg-white border-2 border-green-400 rounded-lg shadow-md flex-grow">
      <div className="space-y-3 text-gray-800">
        <p><span className="font-bold">SUBJECT:</span> {task.subject}</p>
        <p><span className="font-bold">CHAPTER:</span> {task.chapter}</p>
        <p><span className="font-bold">MODE:</span> {task.mode}</p>
        <hr className="my-2"/>
        <p className="font-bold">TOTAL SCORED: {task.totalScored || 'N/A'}</p>
        <p className="font-bold">PENDING HW/ORAL/TEST: {'N/A'}</p>
      </div>
    </div>
  );
}