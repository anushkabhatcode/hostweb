const express = require('express');
const { sequelize } = require('../models/quotes.js'); // Assuming you have a Sequelize instance initialized

const app = express();
const router = express.Router();

// Route to get moods
router.get('/', async (req, res) => {
  try {
    // Query the Moods table directly
    const quotes = await sequelize.query('SELECT quotes, author FROM dbo.quotes');
    res.json(quotes[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;