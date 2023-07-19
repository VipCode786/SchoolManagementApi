const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submissionDate: {
    type: Date,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'completed'],
    default: 'pending'
  }
});

const homeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  submissions: [submissionSchema]
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
