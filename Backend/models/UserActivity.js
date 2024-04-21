// Import Sequelize library and initialize it
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const {User} = require('./user');

const UserActivity = sequelize.define('UserActivity', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Activity: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING, 
      allowNull: true 
    },

    Note:{
      type: DataTypes.STRING, 
      allowNull: true 

    }


    
  });
  

  UserActivity.belongsTo(User, {
      foreignKey: {
        name: 'username',
        allowNull: false
      }});

// Synchronize the model with the database
async function syncModel() {
    try {
      await sequelize.sync();
      
      console.log('User activity model synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing desired User model:', error);
    }
  }
  
syncModel();
// Export the User model and the sync function
module.exports = {
    UserActivity,syncModel,sequelize
};