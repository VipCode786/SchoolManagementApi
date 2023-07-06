const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   duration: {
//     type: String,
//     required: true
//   },
//   fee: {
//     type: Number,
//     required: true
//   }
// });

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // courses: [courseSchema]
});

const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;
