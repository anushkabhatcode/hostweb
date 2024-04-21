const express = require('express');
const { authenticateToken } = require('./authapi.js');
const { SaveRecommend } = require('../models/SaveRecommends')
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/save', authenticateToken, async (req, res) => {
    try {

      // Extract data from the request body and JWT token from headers
      const {name,category} = req.body;
      const username = req.username; // Extract username from decoded token
      const sessionId = req.sessionId; 

      // Iterate over each item in the requestData array and create a SaveRecommends record
      
        await SaveRecommend.create({
          Name: name,
          Category:category,
          sessionId: sessionId,
          username: username
        });
      

      console.log('Recommendations saved successfully:');
      res.status(200).json({ message: 'Recommendations saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
