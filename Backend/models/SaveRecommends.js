// Import Sequelize library and initialize it
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const {User} = require('./user');

const SaveRecommend = sequelize.define('saveRecommend', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.STRING, // Change the data type according to your needs
      allowNull: true // Modify this based on whether sessionId is required or not
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  
SaveRecommend.belongsTo(User, {
      foreignKey: {
        name: 'username',
        allowNull: false
      }});

// Synchronize the model with the database
async function syncModel() {
    try {
      await sequelize.sync();
      
      console.log('SaveRecommend model synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing SaveRecommend model:', error);
    }
  }
  
  syncModel();


// Export the User model and the sync function
module.exports = {
    SaveRecommend,syncModel,sequelize
};