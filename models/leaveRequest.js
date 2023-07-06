const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
 
  references: { type: mongoose.Schema.Types.ObjectId, refPath: 'model_type' },
  model_type: {  type: String, enum: ['Student', 'Instructor'], required: true },

  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
