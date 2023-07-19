const express = require('express');
const router = express.Router();
const assignmentController = require('../../controllers/assignment/assignmentsController')

// POST /homework
router.post('/', assignmentController.createAssignment);

// PUT /homework/:homeworkId
router.put('/:homeworkId', assignmentController.updateHomework);

module.exports = router;
