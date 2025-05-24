const User = require('../model/userModel');


// To get all users that havent been verified
const getUsersWithUnverifiedProofs = async (req, res) => {

    try {

        const users = await User.findAll({
            where: {
                [Op.or]:
                    [
                        { registrationVerified: false },
                        { clearanceVerified: false }
                    ]
            }
        });

        res.status(200).json(users);
        
    } catch (error) {
        console.error('Fetch Error:', error)
        res.status(500).json({ message: 'server error' });
    }
}


//  To verify registration payment
const verifyRegistration = async (req, res) => {

    const userId = req.params

    try {

        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({ message: 'User not found'});

        user.clearanceVerified = true;
        await user.save();

        res.status(200).json({ message: 'Registration Proof Verified', user});
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
}

// To verify clearance payment
const verifyClearance = async (req, res) => {

    const userId = req.params

    try {

        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({ message: 'User not found'});

        user.registrationVerified = true;
        await user.save();

        res.status(200).json({ message: 'Clearance Proof Verified', user});
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
}


module.exports = {
    getUsersWithUnverifiedProofs,
    verifyRegistration,
    verifyClearance,
}