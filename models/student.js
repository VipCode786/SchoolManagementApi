const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  classTeacher: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  }
  
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
