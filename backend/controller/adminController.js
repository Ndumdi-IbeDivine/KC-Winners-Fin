const User = require('../model/userModel');
const { op } = require('sequelize');


// Get users with unverified registration proofs
const getUsersWithUnverifiedProofs = async (req, res) => {

    try {

        const users = await User.findAll({
            where: {
                [Op.or]:
                    [
                        { registrationVerified: false },
                    ]
            }
        });

        res.status(200).json(users);
        
    } catch (error) {
        console.error('Fetch Error:', error)
        res.status(500).json({ message: 'server error' });
    }
}


//  To verify registration
const verifyRegistration = async (req, res) => {
    
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    
    const user = await User.findByIdAndUpdate(userId, 
        { regStatus: 'Verified' },
        { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Registration proof verified succesfully' });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
}


const remindUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // TODO: Replace this with actual email sending logic
        console.log(`Sending reminder to ${user.email}...`);

        res.json({ message: `Reminder sent to ${user.email}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send reminder' });
  }
}

module.exports = {
    getUsersWithUnverifiedProofs,
    verifyRegistration,
    remindUser
}