const express = require('express');
const router = express.Router();
const homeworkController = require('../../controllers/homeWork/homeWork');

// POST /homework
router.post('/', homeworkController.createHomework);

// PUT /homework/:homeworkId
router.put('/:homeworkId', homeworkController.updateHomework);

module.exports = router;
