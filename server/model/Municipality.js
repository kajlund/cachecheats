const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MunicipalitySchema = new Schema(
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
    geocaches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Geocache',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Municipality', MunicipalitySchema);
