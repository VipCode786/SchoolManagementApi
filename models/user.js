const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'role'
  },
  currentInstitute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Parent', 'Student', 'Instructor','Admin',"Agent"]
  },
  
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
