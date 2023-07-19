const express = require('express');
const router = express.Router();
const timetableController = require('../../controllers/timeTable/timeTableController');

// POST /timetable
router.post('/', timetableController.createTimetable);

module.exports = router;
