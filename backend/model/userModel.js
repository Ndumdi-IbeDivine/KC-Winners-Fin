const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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
    registrationVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    },
    clearanceVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
}, {
    tableName: 'Users',
    timestamps: true,
});

console.log(User === sequelize.model.User);

module.exports = User;