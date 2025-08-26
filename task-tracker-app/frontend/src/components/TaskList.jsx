import React, { useState } from 'react';

const TaskList = ({ 
  tasks, 
  onUpdate, 
  onDelete, 
  onStartTimer, 
  onStopTimer, 
  runningTimer 
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: '' });

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
  };

  const handleSave = (taskId) => {
    onUpdate(taskId, editForm);
    setEditingTask(null);
    setEditForm({ title: '', description: '', status: '' });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setEditForm({ title: '', description: '', status: '' });
  };

  const isTimerRunning = (taskId) => {
    return runningTimer && runningTimer.task === taskId;
  };

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No tasks yet. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Your Tasks
        </h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="border border-gray-200 rounded-lg p-4">
              {editingTask === task._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Task description (optional)"
                    rows="2"
                  />
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(task._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {isTimerRunning(task._id) ? (
                        <button
                          onClick={() => onStopTimer(task._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                          Stop Timer
                        </button>
                      ) : (
                        <button
                          onClick={() => onStartTimer(task._id)}
                          disabled={runningTimer}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
                        >
                          Start Timer
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(task._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Timer Display */}
                  {isTimerRunning(task._id) && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                          Timer running since {new Date(runningTimer.startTime).toLocaleTimeString()}
                        </span>
                        <span className="text-sm text-blue-600">
                          ⏱️ Running...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
