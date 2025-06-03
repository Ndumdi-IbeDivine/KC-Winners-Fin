const { Contribution } = require('../model/contributionModel');

const createContribution = async (req, res) => {
    const { userId, contributionName, accountNumber } = req.body;

    try {
        const newContribution = await Contribution.create({ userId, contributionName, accountNumber });

        res.status(201).json({ message: 'Contribution created', contribution: newContribution})
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'server error'});  
    }
};

const getAllContributions = async (req, res) => {

}


module.exports = { createContribution, getAllContributions };