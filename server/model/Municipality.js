const mongoose = require('mongoose');

const MunicipalitySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'A municipality must have a code'],
      unique: true,
      minlength: [3, 'Code must be 3 digts long'],
      maxlength: [3, 'Code must be 3 digts long'],
      match: [/^\d+$/, 'Numbers 0-9 only'],
    },
    name: {
      type: String,
      required: [true, 'A municipality must have a name'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Municipality', MunicipalitySchema);
