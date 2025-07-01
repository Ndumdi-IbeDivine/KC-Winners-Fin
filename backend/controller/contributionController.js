const Contribution = require('../model/contributionModel');
const User = require('../model/userModel');


  // Submit contribution
const createContribution = async (req, res) => {
    try {

        const contributionProofUrl = req.files?.contributionProof?.[0]?.path;

        if (!contributionProofUrl) {
            return res.status(400).json({ message: 'Proof of payment is required' });
        }

        const { amount, description } = req.body;

        if (!req.file) {
            return res.status(400).json({
            success: false,
            message: 'Receipt is required'
            });
        }

        const contribution = new Contribution({
            userId: req.userId,
            amount,
            receiptUrl: contributionProofUrl,
            description
        });

        await contribution.save();

        res.status(201).json({
            success: true,
            message: 'Contribution submitted successfully. Awaiting verification.',
            data: contribution
        });

        } catch (error) {
        console.error('Error submitting contribution:', error);
        res.status(500).json({
            success: false,
            message: 'Could not submit contribution'
        });
        }
  }

  // Get user contributions
const getUserContributions = async (req, res) => {
    try {
      const { userId } = req.params;

      // Users can only view their own contributions unless they're admin
      const user = await User.findById(req.userId);
      if (userId !== req.userId && user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const contributions = await Contribution.find({ userId })
        .populate('verifiedBy', 'fullName')
        .sort({ contributionDate: -1 });

      res.status(200).json(contributions);

    } catch (error) {
      console.error('Error fetching contributions:', error);
      res.status(500).json({
        success: false,
        message: 'Could not load contributions'
      });
    }
  }

  // Admin: Verify contribution
const verifyContribution = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      const { status, rejectionReason } = req.body;
      
      const contribution = await Contribution.findByIdAndUpdate(
        req.params.id,
        {
          status,
          verifiedBy: req.userId,
          verifiedAt: new Date(),
          rejectionReason: status === 'rejected' ? rejectionReason : undefined
        },
        { new: true }
      ).populate('userId', 'fullName email');

      if (!contribution) {
        return res.status(404).json({
          success: false,
          message: 'Contribution not found'
        });
      }

      // Update user's total contributions if verified
      if (status === 'verified') {
        await User.findByIdAndUpdate(contribution.userId._id, {
          $inc: { 
            totalVerifiedContributions: contribution.amount,
            totalContributions: contribution.amount
          }
        });
      }

      res.status(200).json({
        success: true,
        message: `Contribution ${status} successfully`,
        data: contribution
      });

    } catch (error) {
      console.error('Error verifying contribution:', error);
      res.status(500).json({
        success: false,
        message: 'Could not verify contribution'
      });
    }
  }


module.exports = { 
    createContribution,
    getUserContributions,
    verifyContribution      //admin
};

