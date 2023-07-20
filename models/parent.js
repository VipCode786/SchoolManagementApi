const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  firstNameFather: {
    type: String,
    required: true
  },
  middleNameFather: {
    type: String
  },
  lastNameFather: {
    type: String,
    required: true
  },

  firstNameMother: {
    type: String,
    required: true
  },
  middleNameMother: {
    type: String
  },
  lastNameMother: {
    type: String,
    required: true
  },

  firstNameGuardian: {
    type: String,
    required: true
  },
  middleNameGuardian: {
    type: String
  },
  lastNameGuardian: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dobFather: {
    type: Date,
    required: true
  },
  dobMother: {
    type: Date,
    required: true
  },
  dobGuardian: {
    type: String,
    required: true
  },

  emailFather: {
    type: String,
    required: true
  },
  phoneFather: {
    type: String,
    required: true
  },

  emailMother: {
    type: String,
    required: true
  },
  phoneMother: {
    type: String,
    required: true
  },
  emailGuardian: {
    type: String,
    required: true
  },
  phoneGuardian: {
    type: String,
    required: true
  },
  currentInstitute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
