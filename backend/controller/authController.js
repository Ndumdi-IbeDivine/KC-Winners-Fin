const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
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

    } = req.body;

    const registrationProofUrl = req.files?.registrationProof?.[0]?.path;

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


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = { registerUser, loginUser };