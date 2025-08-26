import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const DailySummary = () => {
  const [tasks, setTasks] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTime: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      // Fetch tasks
      const tasksResponse = await api.get('/tasks');
      const todayTasks = tasksResponse.data.filter(task => 
        new Date(task.createdAt) >= startOfDay && new Date(task.createdAt) <= endOfDay
      );
      setTasks(todayTasks);

      // Fetch time logs
      const timeLogsResponse = await api.get('/timelogs');
      const todayTimeLogs = timeLogsResponse.data.filter(log => 
        new Date(log.startTime) >= startOfDay && new Date(log.startTime) <= endOfDay
      );
      setTimeLogs(todayTimeLogs);

      // Calculate stats
      const totalTime = todayTimeLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
      const completedTasks = todayTasks.filter(task => task.status === 'Completed').length;
      const pendingTasks = todayTasks.filter(task => task.status === 'Pending').length;
      const inProgressTasks = todayTasks.filter(task => task.status === 'In Progress').length;

      setStats({
        totalTime,
        completedTasks,
        pendingTasks,
        inProgressTasks
      });
    } catch (error) {
      console.error('Error fetching daily data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Daily Summary
              </h1>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Time Tracked</dt>
                      <dd className="text-lg font-medium text-gray-900">{formatTime(stats.totalTime)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed Tasks</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.completedTasks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.inProgressTasks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Tasks</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.pendingTasks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Today's Tasks
              </h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks created today.</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-gray-600">{task.description}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Time Logs Section */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Today's Time Logs
              </h3>
              {timeLogs.length === 0 ? (
                <p className="text-gray-500">No time tracked today.</p>
              ) : (
                <div className="space-y-3">
                  {timeLogs.map((log) => (
                    <div key={log._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium text-gray-900">{log.task?.title || 'Unknown Task'}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(log.startTime).toLocaleTimeString()} - 
                          {log.endTime ? new Date(log.endTime).toLocaleTimeString() : 'Running...'}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {log.duration ? formatTime(log.duration) : 'Running...'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailySummary;
