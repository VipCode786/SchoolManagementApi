const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  classroom: {
    type: String,
    required: true
  }
});

const timetableSchema = new mongoose.Schema({
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  day: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  periods: [periodSchema]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
