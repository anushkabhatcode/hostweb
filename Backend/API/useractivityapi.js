const express = require('express');
const { Mood } =require('../models/moods')
const { authenticateToken } = require('./authapi.js');
const { UserActivity } = require('../models/UserActivity')
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/activities', authenticateToken, async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    
    let { Activity,Note } = req.body;
    const username = req.username; // Extract username from decoded token
    const sessionId = req.sessionId;
    
    let existingRecord = await UserActivity.findOne({ where: { sessionId:sessionId, username: username } });

    if (existingRecord) {
      // Update the existing record
      console.log("Record found!!!")
      console.log(existingRecord)
      existingRecord = await existingRecord.update({ Activity:Activity,Note:Note });
    } else {
      // Create a new entry in the CurrentMood table
      await UserActivity.create({
        Activity:Activity,
        Note:Note,
        username:username,
        sessionId: sessionId});
    }

    console.log('Mood stored successfully:');
    res.status(200).json({ message: 'Mood registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;