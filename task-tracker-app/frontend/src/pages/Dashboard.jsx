import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Timer from '../components/Timer';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [runningTimer, setRunningTimer] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    checkRunningTimer();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkRunningTimer = async () => {
    try {
      const response = await api.get('/timelogs');
      const runningLog = response.data.find(log => !log.endTime);
      if (runningLog) {
        setRunningTimer(runningLog);
      }
    } catch (error) {
      console.error('Error checking running timer:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStartTimer = async (taskId) => {
    try {
      const response = await api.post('/timelogs/start', { taskId });
      setRunningTimer(response.data);
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  const handleStopTimer = async (taskId) => {
    try {
      await api.post('/timelogs/stop', { taskId });
      setRunningTimer(null);
      fetchTasks(); // Refresh tasks to show updated time
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                Task & Time Tracker
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/daily-summary')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Daily Summary
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Timer Section */}
          {runningTimer && (
            <div className="mb-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Currently Running</h2>
              <Timer
                taskId={runningTimer.task}
                onStop={() => handleStopTimer(runningTimer.task)}
                startTime={runningTimer.startTime}
              />
            </div>
          )}

          {/* Task Form */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {showForm ? 'Cancel' : 'Add New Task'}
              </button>
            </div>
            
            {showForm && (
              <TaskForm onSubmit={handleCreateTask} />
            )}
          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
            runningTimer={runningTimer}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
