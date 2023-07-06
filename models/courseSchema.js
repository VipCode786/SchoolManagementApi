const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  instructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  timetable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timetable'
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
