const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/student/studentController');

// POST request to create a new student with parent info
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);

module.exports = router;
