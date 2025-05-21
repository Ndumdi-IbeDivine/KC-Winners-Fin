const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const UserProfile = require('../model/userProfile');
const contribution = require('../model/contributionModel');

const registerUser = async (req, res) => {
    const { 
        fullName, 
        email, 
        phone, 
        password,
        sex,
        address,
        nextOfKin,
        nextOfKinPhone,
        nextOfKinAddress,
        bankName, 
        accountNumber,
        numberOfAccounts, 
        proofOfPaymentUrl,
        depositorName,
        clearanceFeePaid,

    } = req.body;

    try {

        // To check if user exists
        const existingUser = await User.findOne({ where: {email} });
        if(existingUser) {
            return res.Status(400).json({ message: 'Email already in use' });
        }
    
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        // Create user
        const newUser = await User.create({
            fullName, 
            email, 
            phone, 
            password: hashedPassword, 
            bankName, 
            accountNumber,
    
        });

        const profile = await UserProfile.create({
            sex,
            address,
            nextOfKin,
            nextOfKinPhone,
            nextOfKinAddress,
            numberOfAccounts, 
            proofOfPaymentUrl,
            depositorName,
            clearanceFeePaid,

        });

        const contributions = [];
        for (let i = 1; i <= numberOfAccounts; i++) {
            contributions.push({
                userId: User.id,
                contributionName: `Contibution #${i}`,
                accountNumber,
            })
        }
    
        res.status(201).json({ 
            message: 'User registered Succesfully with profile and contributions', 
            user: newUser,
            userProfile: profile,
        });
        
    } catch (error) {
        console.error('Resgistration error:', error)
        res.status(500).json({ message: 'Server error'})
    }
};



module.exports = { registerUser };