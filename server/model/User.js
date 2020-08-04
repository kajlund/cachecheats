const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
      maxlength: [50, 'Name can not be longer than 50 characters'],
      minlength: [4, 'Name must be at least 4 characters long'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: [true, 'Email must be unique'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'The password must be at least 6 characters long'],
      select: false, // Don't return pwd by default in queries
    },
    avatar: String,
    role: {
      type: String,
      enum: ['', 'user', 'admin'],
      default: '',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    geocaches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Geocache',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  // Generate Avatar
  if (this.isModified('email')) {
    this.avatar = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mm' });
  }

  if (!this.isModified('password')) {
    return next();
  }

  // Encrypt password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model('User', UserSchema);
