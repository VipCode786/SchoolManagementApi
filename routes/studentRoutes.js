const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST request to create a new student with parent info
router.post('/', studentController.createStudent);

module.exports = router;
