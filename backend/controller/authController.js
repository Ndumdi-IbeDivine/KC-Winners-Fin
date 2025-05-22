const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../model/userModel');
const { Contribution } = require('../model/contributionModel');

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

    const registrationProofUrl = req.files?.registrationProof?.[0]?.path;
    const clearanceProofUrl = req.files?.clearanceProof?.[0]?.path;

    try {

        // To check if user exists
        const existingUser = await User.findOne({ 
            where: {
                [Op.or]: [{ email}, { phone}]
            }
        });
        if(existingUser) {
            return res.status(400).json({ 
                message: 
                existingUser.email === email
                ? 'Email already in use'
                : 'Phone number already in use'
            });
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
            sex,
            address,
            nextOfKin,
            nextOfKinPhone,
            nextOfKinAddress,
            numberOfAccounts, 
            proofOfPaymentUrl: registrationProofUrl,
            depositorName,
            clearanceProofUrl,
            clearanceFeePaid: !!clearanceProofUrl,
    
        });

        const contributions = [];
        for (let i = 1; i <= numberOfAccounts; i++) {
            contributions.push({
                userId: newUser.id,
                contributionName: `Contibution #${i}`,
                accountNumber,
            })
        }
        await Contribution.bulkCreate(contributions);
    
        res.status(201).json({ 
            message: 'User registered Succesfully with profile and contributions', 
            user: newUser,
        });
        
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: 'Server error'})
    }
};


module.exports = { registerUser };