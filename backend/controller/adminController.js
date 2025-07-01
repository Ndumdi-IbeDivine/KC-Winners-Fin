const User = require('../model/userModel');
const Contribution = require('../model/contributionModel');
const Withdrawal = require('../model/withdrawalModel');
const Admin = require('../model/adminModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10;



    //Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await Admin.findOne({ email });
        if (existing) {
        return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const admin = await Admin.create({ 
            name,
            password: hashedPassword  
            });

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
        message: 'Admin registered successfully',
        token,
        admin: {
            id: admin._id,
            name: admin.name,
        }
        });
    } catch (err) {
        console.error('Admin registration failed:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

    // Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
      }
    });
  } catch (err) {
    console.error('Admin login failed:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

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
    registerAdmin,
    loginAdmin,
    getPendingRegistrations,
    verifyRegistration,
    getPendingContributions,
    getPendingWithdrawals
}