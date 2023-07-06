const mongoose = require('mongoose');

const studentFeesSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: Date
  }
});

const StudentFees = mongoose.model('StudentFees', studentFeesSchema);

module.exports = StudentFees;
