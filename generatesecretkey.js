const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Print the generated secret key
console.log(`Generated Secret Key: ${secretKey}`);