const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../API/authapi'); // Adjust path as needed

// Setup a test Express app
const app = express();
app.use(express.json());
app.get('/test', authenticateToken, (req, res) => {
  res.status(200).json({ username: req.username, sessionId: req.sessionId });
});

// Mocking environment variables
process.env.REACT_APP_JWT_SECRET = 'your_secret_key';

describe('Authentication API Tests', () => {
  it('should deny access if no token is provided', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Authentication token missing' });
  });

  it('should deny access if token is invalid', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'Invalid token' });
  });

  it('should allow access if token is valid', async () => {
    const token = jwt.sign({ username: 'testuser', sessionId: '12345' }, process.env.REACT_APP_JWT_SECRET);
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ username: 'testuser', sessionId: '12345' });
  });
});

