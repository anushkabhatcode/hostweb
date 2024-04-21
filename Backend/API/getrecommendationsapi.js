const express = require('express'); 
const { authenticateToken } = require('./authapi.js');
const router = express.Router();
const sequelize = require('../database.js')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/recommend', authenticateToken, async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    const username = req.username; // Extract username from decoded token
    const sessionId = req.sessionId;
    const results = await sequelize.query('EXEC getRecommendations @sessionID = :sessionID, @username = :username', {
        replacements: {
          sessionID: sessionId,
          username: username
        },
        type: sequelize.QueryTypes.SELECT
      });
    
    res.status(200).json({ message: 'recommendations provided successfully',results:results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;