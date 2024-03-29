const express = require('express');
const router = express.Router();
const instructorPaymentController = require('../../controllers/instructor/instructorPaymentController');

// POST request to create or update an instructor payment
router.post('/instructor-payments', instructorPaymentController.createOrUpdatePayment);

module.exports = router;
