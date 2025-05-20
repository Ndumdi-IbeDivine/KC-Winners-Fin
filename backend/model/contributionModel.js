const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user')

const Contribution = sequelize.define('Contribution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contributionName: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 2000, 
  },
  frequency: {
    type: DataTypes.STRING,
    defaultValue: 'weekly',
  },
  durationInMonths: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
  },
}, {
  timestamps: true,
});

User.hasMany(Contribution, { foreignKey: 'userId' });
Contribution.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Contribution };
