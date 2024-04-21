// Import Sequelize library and initialize it
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const {User} = require('./user');

const Contact = sequelize.define('Contact', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(4000),
      allowNull: true,
     
    },
    Message:{
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING, 
      allowNull: false 
    }
  });
  
    Contact.belongsTo(User, {
      foreignKey: {
        name: 'username',
        allowNull: false
      }});

// Synchronize the model with the database
async function syncModel() {
    try {
      await sequelize.sync();
      
      console.log('Contact model synchronized successfully.');
    } catch (error) {
      console.error('Contact User model:', error);
    }
  }
  
  syncModel();

module.exports = {
    Contact,syncModel,sequelize
};