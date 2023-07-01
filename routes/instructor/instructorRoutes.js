const express = require('express');
const router = express.Router();
const instructotController = require('../../controllers/instructor/instructorController.js');

// POST request to create a new student with parent info
router.post('/', instructotController.createInstructor);


module.exports = router;