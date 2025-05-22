const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const UserProfile = sequelize.define('UserProfile', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'Users', 
        key: 'id',
        },
        onDelete: 'CASCADE',
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nextOfKin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nextOfKinPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nextOfKinAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfAccounts: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    proofOfPaymentUrl: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    depositorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clearanceFeePaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    clearanceFeeProofUrl: {
        type: DataTypes.STRING, 
        allowNull: true,
    }
});

User.hasOne(UserProfile, {foreignKey: 'userId', onDelete: 'CASCADE'});
UserProfile.belongsTo(User, {foreignKey: 'userId'});

module.exports = UserProfile;