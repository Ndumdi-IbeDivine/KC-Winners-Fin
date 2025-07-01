const Withdrawal = require('../model/withdrawalModel');
const User = require('../model/userModel');


  // Submit withdrawal request
const createWithdrawal = async (req, res) => {
    try {
        const clearanceProofUrl = req.files?.clearanceProof?.[0]?.path;

        if (!clearanceProofUrl) {
            return res.status(400).json({ message: 'Proof of payment is required' });
        }
      const { amount, description } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Receipt is required'
        });
      }

      // Check if user has enough verified contributions
      const user = await User.findById(req.userId);
      if (user.totalVerifiedContributions < amount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient verified contributions for withdrawal'
        });
      }

      const withdrawal = new Withdrawal({
        userId: req.userId,
        amount,
        receiptUrl: clearanceProofUrl,
        description
      });

      await withdrawal.save();

      res.status(201).json({
        success: true,
        message: 'Withdrawal request submitted successfully. Awaiting clearance.',
        data: withdrawal
      });

    } catch (error) {
      console.error('Error submitting withdrawal:', error);
      res.status(500).json({
        success: false,
        message: 'Could not submit withdrawal request'
      });
    }
  }

  // Get user withdrawals
const getUserWithdrawals = async (req, res) => {
    try {
      const { userId } = req.params;

      // Users can only view their own withdrawals unless they're admin
      const user = await User.findById(req.userId);
      if (userId !== req.userId && user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const withdrawals = await Withdrawal.find({ userId })
        .populate('clearedBy', 'fullName')
        .sort({ withdrawalDate: -1 });

      res.status(200).json(withdrawals);

    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      res.status(500).json({
        success: false,
        message: 'Could not load withdrawals'
      });
    }
  }

  // Admin: Clear withdrawal
const clearWithdrawal = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const { status, rejectionReason } = req.body;
      
      const withdrawal = await Withdrawal.findByIdAndUpdate(
        req.params.id,
        {
          status,
          clearedBy: req.userId,
          clearedAt: new Date(),
          rejectionReason: status === 'rejected' ? rejectionReason : undefined
        },
        { new: true }
      ).populate('userId', 'fullName email');

      if (!withdrawal) {
        return res.status(404).json({
          success: false,
          message: 'Withdrawal not found'
        });
      }

      // Update user's balance if cleared
      if (status === 'cleared') {
        await User.findByIdAndUpdate(withdrawal.userId._id, {
          $inc: { totalVerifiedContributions: -withdrawal.amount }
        });
      }

      res.status(200).json({
        success: true,
        message: `Withdrawal ${status} successfully`,
        data: withdrawal
      });

    } catch (error) {
      console.error('Error clearing withdrawal:', error);
      res.status(500).json({
        success: false,
        message: 'Could not clear withdrawal'
      });
    }
  }

module.exports = {
    createWithdrawal,
    getUserWithdrawals,
    clearWithdrawal
}