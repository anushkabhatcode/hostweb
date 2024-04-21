const express = require('express');
const { DesiredMood } = require('../models/DesiredMood'); // Assuming you have a CurrentMood model defined
const { Mood } =require('../models/moods')
const { authenticateToken } = require('./authapi.js');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/desiredmood', authenticateToken, async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    
    let { desiredMood } = req.body;
    console.log("desired:",desiredMood)
    const username = req.username; // Extract username from decoded token
    const sessionId = req.sessionId;
    // if(currentMood==='Irritable'){
    //   console.log("hellooooo")
    //   currentMood = 'Angry
    // }
    const mood = await Mood.findOne({ where: { Mood: desiredMood, Type: 'desired'  },
    attributes: ['id']  });
    const { id } = mood.dataValues;

    if (!id) {
      return res.status(404).json({ error: 'Mood not found' });
    }

    let existingRecord = await DesiredMood.findOne({ where: { sessionId:sessionId, username: username } });
    

    if (existingRecord) {
      // Update the existing record
      console.log("Record found")
      console.log(existingRecord)
      existingRecord = await existingRecord.update({ MoodId:id });
    } else {
      // Create a new entry in the CurrentMood table
      await DesiredMood.create({
        MoodId:id,
        username:username,
        sessionId: sessionId});
    }


    console.log('Desired Mood stored successfully:');
    res.status(200).json({ message: 'Desired Mood registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/desiredmood', authenticateToken, async (req, res) => {
  try {
    const username = req.username;

    const desiredMoods = await DesiredMood.findOne({ 
      where: { username: username },
      order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
    });

    if (!desiredMoods)
    {
      return res.status(200).json({ Message: 'Desired mood not found' });
    }

    const createDate = desiredMoods.createdAt

    const mood = await Mood.findOne({ where: { ID: desiredMoods.MoodId}});

    if (!mood) {
      console.log("Not found")
      return res.status(404).json({ error: 'Desired mood ID not found' });
    }


    res.status(200).json({ desiredMoods: mood.Mood, createDate:createDate });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;