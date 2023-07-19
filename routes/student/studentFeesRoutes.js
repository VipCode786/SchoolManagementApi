const express = require('express');
const router = express.Router();
const studentFeesController = require('../../controllers/studentFees/studentFeesController');

// POST /student-fees
router.post('/', studentFeesController.createStudentFees);

// PUT /student-fees/:id
router.put('/:id', studentFeesController.updateStudentFees);

module.exports = router;
