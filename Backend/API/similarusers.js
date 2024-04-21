const express = require('express'); 
const { authenticateToken } = require('./authapi.js');
const router = express.Router();
const sequelize = require('../database.js')

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', authenticateToken,async (req, res) => {
  try {

    const username = req.username; 
    const sessionId = req.sessionId;

    const results = await sequelize.query('EXEC getsimilarusers @sessionID = :sessionID, @username = :username', {
        replacements: {
          sessionID: sessionId,
          username: username
        },
        type: sequelize.QueryTypes.SELECT
      });

      const parsedData = [];


      // Iterate over the object's keys
      for (const key in results[0]) {
        if (Object.hasOwnProperty.call(results[0], key)) {
          // Parse the JSON string for the current key
          const innerJSONArray = JSON.parse(results[0][key]);
          
          // Add the parsed JSON array to the result array
          parsedData.push(innerJSONArray);
        }
      }
   
    const data =parsedData[0]
    const newData = data.map(obj => {
        // Check if the SR array contains only one empty object
        if (obj.SR.length === 1 && Object.keys(obj.SR[0]).length === 0) {
          // If so, set the SR array to an empty array
          obj.SR = [];
        }
        return obj;
      });
    
    
    res.status(200).json({ message: 'similar users provided successfully' ,responseData:newData});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Issue with similar users' });
  }
});

module.exports = router;