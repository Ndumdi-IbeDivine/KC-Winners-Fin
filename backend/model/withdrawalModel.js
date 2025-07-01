const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  receiptUrl: {
    type: String,
    required: true
  },
  clearanceReceiptUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'cleared', 'rejected', 'completed'],
    default: 'pending'
  },
  withdrawalDate: {
    type: Date,
    default: Date.now
  },
  clearedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clearedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  reference: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Generate reference before saving
withdrawalSchema.pre('save', function(next) {
  if (!this.reference) {
    this.reference = `WITH-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  next();
});

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

module.exports = Withdrawal;