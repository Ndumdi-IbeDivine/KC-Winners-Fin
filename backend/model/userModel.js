const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  nextOfKin: {
    type: String,
    required: true,
    trim: true
  },
  nextOfKinPhone: {
    type: String,
    required: true,
    trim: true
  },
  nextOfKinAddress: {
    type: String,
    required: true,
    trim: true
  },
  numberOfAccounts: {
    type: Number,
    required: true,
    min: 1
  },
  proofOfPaymentUrl: {
    type: String,
    required: true
  },
  depositorName: {
    type: String,
    trim: true
  },
  registrationVerified: {
    type: Boolean,
    default: false
  },
  clearanceVerified: {
    type: Boolean,
    default: false
  },
  regStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  totalContributions: {
    type: Number,
    default: 0
  },
  totalVerifiedContributions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;