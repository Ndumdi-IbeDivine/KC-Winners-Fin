const User = require('../model/userModel');


// To get all users that havent been verified
const getUsersWithUnverifiedProofs = async (req, res) => {

    try {

        const users = User.findAll({
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

    try {
        
    } catch (error) {
        
    }
}

// To verify clearance payment
const verifyClearance = async (req, res) => {

    try {
        
    } catch (error) {
        
    }
}