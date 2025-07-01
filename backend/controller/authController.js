const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

  // Register user
const register = async (req, res) => {
    try {

        const registrationProofUrl = req.files?.registrationProof?.[0]?.path;

        if (!registrationProofUrl) {
            return res.status(400).json({ message: 'Proof of payment is required' });
        }
        
        const {
            fullName, phone, password, bankName, accountNumber,
            sex, address, nextOfKin, nextOfKinPhone, nextOfKinAddress,
            numberOfAccounts, depositorName
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ fullName }, { phone }] 
        });

        if (existingUser) {
            return res.status(400).json({
            success: false,
            message: 'User with this email or phone already exists'
            });
        }

        // Check if file was uploaded
        if (!req.files) {
            return res.status(400).json({
            success: false,
            message: 'Proof of payment is required'
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        // Create new user
        const user = new User({
            fullName,
            phone,
            password: hashedPassword,
            bankName,
            accountNumber,
            sex,
            address,
            nextOfKin,
            nextOfKinPhone,
            nextOfKinAddress,
            numberOfAccounts,
            proofOfPaymentUrl: registrationProofUrl,
            depositorName
        });

        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Your account is pending verification.',
            data: {
            user: {
                id: user._id,
                fullName: user.fullName,
                phone: user.phone,
                regStatus: user.regStatus
            },
            token
            }
        });
        console.log('Route working');

        } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
  }

  // Login user
const login = async (req, res) => {
    try {
      const { phone, password } = req.body;

      // Find user by name
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid name or password'
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            fullName: user.fullName,
            phone: user.phone,
            role: user.role,
            regStatus: user.regStatus,
            registrationVerified: user.registrationVerified
          },
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.'
      });
    }
  }


module.exports = { register, login };