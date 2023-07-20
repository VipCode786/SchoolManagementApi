const mongoose = require('mongoose');
const Address = require('./utils/addressSchema');
const counterId = require("../models/utils/counterId");
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const { v4: uuidv4 } = require('uuid');

const agentSchema = new mongoose.Schema({

  agentId: {
    type: String,
    default: () => {
      const dynamicNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // Generate a random number between 0 and 999
      const uuid = uuidv4();
      return 'AG-' + dynamicNumber + '-' + uuid;
    },
    unique: true,
  },
 firstName: {
    type: String,
    required: [true,"FirstName is required"],
    trim:true
  },
  middleName:{
    type: String,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    required: [true,"LastName is required"],
    trim:true
  },
  email: {
    type: String,
    required: [true,'Email is required'],
    unique: true,
    trim:true,
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
    unique: true,
    trim:true,
  },
  
  // password: {
  //   type: String,
  //   required: [true,'Password is required'],
  //   minlength: [6, 'Minimum 6 Characters'],
  //   maxLength: [12,"Maximum 12 characters"],
  //   trim:true,
  //   validate: {
  //     validator: function (value) {
  //       // At least one capital letter, one small letter, one numeric, and one special character
  //       const hasCapitalLetter = /[A-Z]/.test(value);
  //       const hasSmallLetter = /[a-z]/.test(value);
  //       const hasNumeric = /\d/.test(value);
  //       const hasSpecialChar = /[!@#$%^&*()]/.test(value);
  
  //       if (!(hasCapitalLetter && hasSmallLetter && hasNumeric && hasSpecialChar)) {
  //         throw new Error('Password must contain at least one capital letter, one small letter, one numeric, and one special character');
  //       }
        
  //       return true;
  //     },
  //     message: 'Invalid password',
  //   },
  // },

  isVerifiedAgent:{
    type:Boolean,
    default:false,
  },
  isSuperAdminAgent:{
    type:Boolean,
    default:false,
  },
  address: {
    type: Address.schema, // Use the address schema as a subdocument
    required: true
  },
  assignInstitutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute'
  }],
  allAgentAccess:{
    type:Boolean,
    default:false,
  }
});


// agentSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });


const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
