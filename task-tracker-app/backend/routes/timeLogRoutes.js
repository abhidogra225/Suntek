const express = require('express');
const router = express.Router();
const { startTimer, stopTimer, getLogs } = require('../controllers/timeLogController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protect all routes

router.post('/start', startTimer);
router.post('/stop', stopTimer);
router.get('/', getLogs);

module.exports = router;
