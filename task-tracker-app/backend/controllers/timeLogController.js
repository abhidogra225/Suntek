const TimeLog = require('../models/TimeLog');
const Task = require('../models/Task');

// @desc    Start timer for a task
// @route   POST /api/timelogs/start
// @access  Private
const startTimer = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Check if task exists and belongs to user
    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if there's already a running timer for this task
    const runningTimer = await TimeLog.findOne({
      task: taskId,
      user: req.user.id,
      endTime: null
    });

    if (runningTimer) {
      return res.status(400).json({ message: 'Timer already running for this task' });
    }

    const timeLog = await TimeLog.create({
      user: req.user.id,
      task: taskId,
      startTime: new Date()
    });

    res.status(201).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Stop timer for a task
// @route   POST /api/timelogs/stop
// @access  Private
const stopTimer = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Find the running timer for this task
    const timeLog = await TimeLog.findOne({
      task: taskId,
      user: req.user.id,
      endTime: null
    });

    if (!timeLog) {
      return res.status(404).json({ message: 'No running timer found for this task' });
    }

    const endTime = new Date();
    const duration = Math.round((endTime - timeLog.startTime) / (1000 * 60)); // Duration in minutes

    timeLog.endTime = endTime;
    timeLog.duration = duration;
    await timeLog.save();

    res.json(timeLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all time logs for user
// @route   GET /api/timelogs
// @access  Private
const getLogs = async (req, res) => {
  try {
    const { taskId } = req.query;
    
    let query = { user: req.user.id };
    if (taskId) {
      query.task = taskId;
    }

    const timeLogs = await TimeLog.find(query)
      .populate('task', 'title')
      .sort({ startTime: -1 });

    res.json(timeLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  startTimer,
  stopTimer,
  getLogs,
};
