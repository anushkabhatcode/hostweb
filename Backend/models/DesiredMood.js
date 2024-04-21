// Import Sequelize library and initialize it
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const {User} = require('./user');
const {Mood} = require('./moods') 

const DesiredMood = sequelize.define('DesiredMood', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    MoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING, // Change the data type according to your needs
      allowNull: true // Modify this based on whether sessionId is required or not
    }
  });
  
  // Define the foreign key relationship between CurrentMood and OtherModel
  DesiredMood.belongsTo(Mood, {
    foreignKey: {
      name: 'MoodId',
      allowNull: false
    }});

  DesiredMood.belongsTo(User, {
      foreignKey: {
        name: 'username',
        allowNull: false
      }});
  



// Synchronize the model with the database
async function syncModel() {
    try {
      await sequelize.sync();
      
      console.log('Desired User model synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing desired User model:', error);
    }
  }
  
  syncModel();


// Export the User model and the sync function
module.exports = {
    DesiredMood,syncModel,sequelize
};