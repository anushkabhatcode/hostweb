const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { User } = require('../models/user'); // Assuming you have a User model
const router = express.Router();

router.use(bodyParser.json());
var crypto = require('crypto');

//function code taken from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
}

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, email,password } = req.body;
    // Find user by username
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error:"Invalid credentials"});
    }
    // Generate JWT
    
    const secretKey = process.env.REACT_APP_JWT_SECRET
    const sessionId = randomValueHex(4)+"-"+randomValueHex(4)+"-"+randomValueHex(4); 
    console.log(sessionId)
    const token = jwt.sign({  username: username, sessionId: sessionId}, secretKey);
    res.json({token});
  } catch (error) {
    res.status(500).json({ lgin_pass: error.message });
  }
});

module.exports = router;


// Start server


