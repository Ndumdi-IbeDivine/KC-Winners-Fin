const User = require('../model/userModel');


  // Get user profile
const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({
        success: false,
        message: 'Could not fetch profile'
      });
    }
  }

  // Update user profile
const updateProfile = async (req, res) => {
    try {
      const updates = req.body;
      delete updates.password; // Don't allow password updates through this route
      delete updates.regStatus; // Don't allow status updates from users

      const user = await User.findByIdAndUpdate(
        req.userId,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Could not update profile'
      });
    }
  }


module.exports = { getProfile, updateProfile };