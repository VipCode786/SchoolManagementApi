const mongoose = require('mongoose');
const { default: addressSchema } = require('./utils/addressSchema');
const Address = require('./utils/addressSchema');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

module.exports = Address;


const instituteSchema = new mongoose.Schema({
  // InstituteId: Number,
instituteName: {
    type: String,
    required: [true,"FirstName is required"]
  },

  email: {
    type: String,
    required: [true,'Email is required'],
    unique: true,
    caseInsensitive:true,
    validate: {
        validator: function (email) {
          // Regular expression pattern to validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Invalid email format',
      },
     
      
  },
  phone:{
    type: String,
    required: [true,'Phone is required'],
    unique: true
  },

  password: {
    type: String,
    required: [true,'Password is required'],
    minlength: [6, 'Minimum 6 Characters'],
    maxLength: [12,"Maximum 12 characters"],
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

  isVerifiedInstitute:{
    type:Boolean,
    default:false,
  },
  isPaidInstitute:{
    type: Boolean,
    default:false
  }
});

// instituteSchema.plugin(AutoIncrement);
const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;
