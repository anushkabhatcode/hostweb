const express = require('express');
const { CurrentMood } = require('../models/CurrentMood'); // Assuming you have a CurrentMood model defined
const { Mood } =require('../models/moods')
const { authenticateToken } = require('./authapi.js');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/currentmood', authenticateToken, async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    
    let { currentMood } = req.body;
    const username = req.username; // Extract username from decoded token
    const sessionId = req.sessionId;
    const mood = await Mood.findOne({ where: { Mood: currentMood, Type: 'current'  },
    attributes: ['id']  });
    const { id } = mood.dataValues;

    if (!id) {
      return res.status(404).json({ error: 'Mood not found' });
    }

    let existingRecord = await CurrentMood.findOne({ where: { sessionId:sessionId, username: username } });

    if (existingRecord) {
      // Update the existing record
      console.log("Record found")
      console.log(existingRecord)
      existingRecord = await existingRecord.update({ MoodId:id });
    } else {
      // Create a new entry in the CurrentMood table
      await CurrentMood.create({
        MoodId:id,
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

// GET endpoint to retrieve current mood
router.get('/currentmood', authenticateToken, async (req, res) => {
  try {
    const username = req.username;

    const currentMood = await CurrentMood.findOne({ 
      where: { username: username },
      order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
    });
    
    if (!currentMood)
    {
      return res.status(200).json({ Message: 'Current mood not found' });
    }

    const createDate = currentMood.createdAt

    const mood = await Mood.findOne({ where: { ID: currentMood.MoodId}});
    
    if (!mood) {
      console.log("Not found")
      return res.status(200).json({ Message: 'Current mood ID not found' });
    }
  

    res.status(200).json({ currentMood: mood.Mood ,createDate:createDate});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;