const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }
  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    // Attach the username from the decoded token to the request object
    req.username= decodedToken.username
    req.sessionId = decodedToken.sessionId;
    console.log("authapi :",req.sessionId)
    next();
  });
}

module.exports = { authenticateToken };