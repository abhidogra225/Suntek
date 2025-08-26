import React, { useState, useEffect } from 'react';

const Timer = ({ taskId, onStop, startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const elapsed = Math.floor((now - start) / 1000); // elapsed time in seconds
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const handleStop = () => {
    onStop(taskId);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-mono font-bold text-blue-900">
          {formatTime(elapsedTime)}
        </div>
        <div className="text-sm text-blue-600">
          ⏱️ Timer Running
        </div>
      </div>
      
      <button
        onClick={handleStop}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Stop Timer
      </button>
    </div>
  );
};

export default Timer;
