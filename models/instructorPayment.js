const mongoose = require('mongoose');

const instructorPaymentSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  }
});

const InstructorPayment = mongoose.model('InstructorPayment', instructorPaymentSchema);

module.exports = InstructorPayment;
