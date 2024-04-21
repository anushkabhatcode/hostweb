// database.js

const { Sequelize } = require('sequelize');

// Initialize Sequelize and specify database connection parameters
const sequelize = new Sequelize('Mood','moodadmin', process.env.REACT_APP_PASSWORD, {
    host: 'sqlmood.database.windows.net',
    port: 1433,
    dialect: 'mssql',
    dialectOptions: {
        options: {
          trustedConnection: true
        }
     }
});
module.exports = sequelize;


// database.js

// const { Sequelize } = require('sequelize');

// // Initialize Sequelize and specify database connection parameters
// const sequelize = new Sequelize('Moodharbor','root', 'admin', {
//     host: 'localhost',
//     port: 1434,
//     dialect: 'mssql',
//     dialectOptions: {
//         options: {
//           trustedConnection: true
//         }
//      }
// });
// module.exports = sequelize;


