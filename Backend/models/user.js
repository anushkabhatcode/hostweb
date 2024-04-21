const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define the User model
const User = sequelize.define('User', {
  // Define model attributes
  // Id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: true
  // },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    autoIncrement:false,
    primaryKey:true
  },
  password: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensures that each email is unique
  },
 
});

// Synchronize the model with the database
async function syncModel() {
  try {
    await sequelize.sync();
    console.log('User model synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing User model:', error);
  }
}

syncModel();

// Export the User model and the sync function
module.exports = {
  User,
  syncModel
};