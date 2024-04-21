// Import Sequelize library and initialize it
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define the User model
const Mood = sequelize.define('moods', {
  // Define model attributes
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true
  },
  Mood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // You can add more attributes as needed
}, {
  timestamps: false, // Disable timestamps
});



// Export the User model and the sync function
module.exports = {
  Mood,sequelize
};