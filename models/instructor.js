const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    // required: true
  },
  end_date: {
    type: Date,
    // required: true
  }
});

const experienceSchema = new mongoose.Schema({
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute'
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    // required: true
  },
  current: {
    type: Boolean,
    default: true
  },
  subjects: [subjectSchema]
});
// Middleware function to convert start_date and end_date strings to Date objects
experienceSchema.pre('save', function (next) {
  console.log("Before conversion:", this.start_date); // Before conversion: 2022-04-01
  this.start_date = new Date(this.start_date);
  console.log("After conversion:", this.start_date); // After conversion: 2022-04-01T00:00:00.000Z
  console.log("End date:", this.end_date); // End date: 2022-06-30
  next();
});

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  
  experiences: [experienceSchema]
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
