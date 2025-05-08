const bcrypt = require('bcrypt');
const User = require('../model/user');

const registerUser = async (req, res) => {
    const { fullName, email, phone, password, bankName, accountNumber } = req.body;

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
    
        res.status(201).json({ message: 'User registered Succesfully', user: newUser});
        
    } catch (error) {
        console.error('Resgistration error:', error)
        res.status(500).json({ message: 'Server error'})
    }
};



module.exports = { registerUser };