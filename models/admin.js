const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  institutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute'
  }],
  isVerified:{
    type:Boolean,
    default:false,
  },
  isSuperAdmin:{
    type:Boolean,
    default:false,
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
