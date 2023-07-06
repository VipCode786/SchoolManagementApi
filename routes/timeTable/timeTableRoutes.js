const express = require('express');
const router = express.Router();
const timetableController = require('../../controllers/timeTable/timeTable');

// POST /timetable
router.post('/', timetableController.createTimetable);

module.exports = router;
