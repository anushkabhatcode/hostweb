const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define the User model
const Quotes = sequelize.define('quotes', {
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  quotes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Moodid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // You can add more attributes as needed
});



// Export the User model and the sync function
module.exports = {
  Quotes,sequelize
};