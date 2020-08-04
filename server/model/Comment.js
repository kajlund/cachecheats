const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, 'A comment must have a body'],
      minlength: [3, 'Body must be at least 3 chars long'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    geocache: {
      type: Schema.Types.ObjectId,
      ref: 'Geocache',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
