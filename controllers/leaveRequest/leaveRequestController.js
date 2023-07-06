const LeaveRequest = require('../../models/leaveRequest');

// Create a leave request
exports.createLeaveRequest = async (req, res) => {
  try {
    const { model_type, references, startDate, endDate, reason } = req.body;

    const newLeaveRequest = new LeaveRequest({
      model_type,
      references,
      startDate,
      endDate,
      reason
    });

    const savedLeaveRequest = await newLeaveRequest.save();

    res.status(201).json({ status: 'success', data: savedLeaveRequest });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('references');

    res.status(200).json({ status: 'success', data: leaveRequests });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get a single leave request
exports.getLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;

    const leaveRequest = await LeaveRequest.findById(leaveRequestId).populate('references');

    if (!leaveRequest) {
      return res.status(404).json({ status: 'error', message: 'Leave request not found' });
    }

    res.status(200).json({ status: 'success', data: leaveRequest });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Update a leave request
exports.updateLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const { startDate, endDate, reason } = req.body;

    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      leaveRequestId,
      { startDate, endDate, reason },
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).json({ status: 'error', message: 'Leave request not found' });
    }

    res.status(200).json({ status: 'success', data: leaveRequest });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Delete a leave request
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;

    const leaveRequest = await LeaveRequest.findByIdAndDelete(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ status: 'error', message: 'Leave request not found' });
    }

    res.status(200).json({ status: 'success', message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
