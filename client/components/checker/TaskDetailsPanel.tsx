import React, { useState, useEffect } from 'react';

export default function TaskDetailsPanel({ task }) {
  // Use state to manage the editable fields
  const [editableTask, setEditableTask] = useState(task);

  // Effect to update the form if the initial task prop changes
  useEffect(() => {
    setEditableTask(task);
  }, [task]);

  // A single handler to update the state for any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    // In a real app, you would pass this data up to the parent component
    // For example: onUpdate(editableTask);
    console.log("Updated Task Details:", editableTask);
    alert("Task details updated in console!");
  };

  return (
    <div className="p-4 bg-white border-2 border-green-400 rounded-lg shadow-md flex-grow">
      <div className="space-y-4 text-gray-800">
        
        {/* Subject Input */}
        <div>
          <label htmlFor="subject" className="font-bold text-sm">SUBJECT</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={editableTask.subject || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Chapter Input */}
        <div>
          <label htmlFor="chapter" className="font-bold text-sm">CHAPTER</label>
          <input
            type="text"
            id="chapter"
            name="chapter"
            value={editableTask.chapter || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Mode Input */}
        <div>
          <label htmlFor="mode" className="font-bold text-sm">MODE</label>
          <input
            type="text"
            id="mode"
            name="mode"
            value={editableTask.mode || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <hr className="my-2"/>

        {/* Non-editable fields remain as text */}
        <p><span className="font-bold">TOTAL SCORED:</span> {task.totalScored || 'N/A'}</p>
        <p><span className="font-bold">PENDING HW/ORAL/TEST:</span> {'N/A'}</p>

        {/* Update Button */}
        <div className="pt-2">
            <button 
                onClick={handleUpdate}
                className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Update Details
            </button>
        </div>
      </div>
    </div>
  );
}