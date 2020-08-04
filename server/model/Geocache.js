const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cacheSchema = new Schema(
  {
    gc: {
      required: [true, 'A geocache must have a unique GC-code'],
      trim: true,
      type: String,
      unique: true,
    },
    cachetype: {
      type: Schema.Types.ObjectId,
      ref: 'CacheType',
    },
    name: {
      required: [true, 'A geocache must have a name'],
      trim: true,
      type: String,
    },
    coords: {
      trim: true,
      type: String,
    },
    municipality: {
      type: Schema.Types.ObjectId,
      ref: 'Municipality',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('Geocache', cacheSchema);
