const express = require('express');
const { Contact } = require('../models/Contact'); // Assuming you have a CurrentMood model defined
const { authenticateToken } = require('./authapi.js');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/contact',  async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    
    const { Title, Message } = req.body;
    // const username = req.username; 
    // const sessionId = req.sessionId;
    const username = "Anushka123"; 
    const sessionId = "B0E4-C8CA-A809";

    await Contact.create({
        username:username,
        sessionId: sessionId,
        Title:Title,
        Message:Message
    });
    

    res.status(200).json({ message: 'Contact information registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;