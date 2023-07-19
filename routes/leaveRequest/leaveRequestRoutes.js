const express = require('express');
const router = express.Router();
const leaveRequestController = require('../../controllers/leaveRequest/leaveRequestController');

// Create a leave request
router.post('/leave-requests', leaveRequestController.createLeaveRequest);

// Get all leave requests
router.get('/leave-requests', leaveRequestController.getAllLeaveRequests);

// Get a single leave request
router.get('/leave-requests/:id', leaveRequestController.getLeaveRequest);

// Update a leave request
router.put('/leave-requests/:id', leaveRequestController.updateLeaveRequest);

// Delete a leave request
router.delete('/leave-requests/:id', leaveRequestController.deleteLeaveRequest);

module.exports = router;
