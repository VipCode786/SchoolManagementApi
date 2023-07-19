const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  permanent: {
    line1: {
      type: String,
      required: [true, 'Line one is required'],
      trim: true
    },
    line2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    }
  },
  current: {
    line1: {
      type: String,
      required: [true, 'Line one is required'],
      trim: true
    },
    line2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    }
  }
});

  const Address = mongoose.model('Address', addressSchema);

  module.exports = Address;