const User = require('../model/userModel');
const Contribution = require('../model/contributionModel');
const Withdrawal = require('../model/withdrawalModel');


  // Get all pending registrations
const getPendingRegistrations = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const pendingUsers = await User.find({ 
        regStatus: 'Pending' 
      }).select('-password').sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: pendingUsers
      });

    } catch (error) {
      console.error('Error fetching pending registrations:', error);
      res.status(500).json({
        success: false,
        message: 'Could not load pending registrations'
      });
    }
  }

  // Verify user registration
const verifyRegistration =  async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const { userId } = req.params;
      const { status, rejectionReason } = req.body;

      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be Approved or Rejected'
        });
      }

      const updateData = {
        regStatus: status,
        registrationVerified: status === 'Approved',
        registrationVerifiedBy: req.userId,
        registrationVerifiedAt: new Date()
      };

      if (status === 'Rejected') {
        updateData.registrationRejectionReason = rejectionReason;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Registration ${status.toLowerCase()} successfully`,
        data: updatedUser
      });

    } catch (error) {
      console.error('Error verifying registration:', error);
      res.status(500).json({
        success: false,
        message: 'Could not verify registration'
      });
    }
  }

  // Get all pending contributions
const getPendingContributions = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const contributions = await Contribution.find({ status: 'pending' })
        .populate('userId', 'fullName email phone')
        .sort({ contributionDate: -1 });

      res.status(200).json({
        success: true,
        data: contributions
      });

    } catch (error) {
      console.error('Error fetching pending contributions:', error);
      res.status(500).json({
        success: false,
        message: 'Could not load pending contributions'
      });
    }
  }

  // Get all pending withdrawals
const getPendingWithdrawals = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const withdrawals = await Withdrawal.find({ status: 'pending' })
        .populate('userId', 'fullName email phone totalVerifiedContributions')
        .sort({ withdrawalDate: -1 });

      res.status(200).json({
        success: true,
        data: withdrawals
      });

    } catch (error) {
      console.error('Error fetching pending withdrawals:', error);
      res.status(500).json({
        success: false,
        message: 'Could not load pending withdrawals'
      });
    }
  }


module.exports = {
    getPendingRegistrations,
    verifyRegistration,
    getPendingContributions,
    getPendingWithdrawals
}