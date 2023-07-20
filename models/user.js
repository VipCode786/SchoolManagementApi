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
    required: [true,'Password is required'],
    minlength: [6, 'Minimum 6 Characters'],
    maxLength: [12,"Maximum 12 characters"],
    trim:true,
    validate: {
      validator: function (value) {
        // At least one capital letter, one small letter, one numeric, and one special character
        const hasCapitalLetter = /[A-Z]/.test(value);
        const hasSmallLetter = /[a-z]/.test(value);
        const hasNumeric = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*()]/.test(value);
  
        if (!(hasCapitalLetter && hasSmallLetter && hasNumeric && hasSpecialChar)) {
          throw new Error('Password must contain at least one capital letter, one small letter, one numeric, and one special character');
        }
        
        return true;
      },
      message: 'Invalid password',
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'role'
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
