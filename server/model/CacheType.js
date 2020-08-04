const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CacheTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A cache type must have a unique name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
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

module.exports = mongoose.model('CacheType', CacheTypeSchema);
