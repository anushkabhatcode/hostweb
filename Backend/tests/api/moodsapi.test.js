const request = require('supertest');
const express = require('express');
const { sequelize } = require('../../models/moods'); // Correct the import path as needed
const moodsRouter = require('../../API/moodsapi'); // Correct the import path as needed

const app = express();
app.use(express.json());
app.use('/api/moods', moodsRouter);

// Mock sequelize query method
jest.mock('../../models/moods', () => ({
  sequelize: {
    query: jest.fn()
  }
}));

describe('Moods API Tests', () => {
  it('should retrieve all moods', async () => {
    const fakeMoods = [['Happy', 'Sad'], { columns: ['mood'] }];
    sequelize.query.mockResolvedValue(fakeMoods);

    const response = await request(app).get('/api/moods');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeMoods);
  });

  it('should handle errors when fetching moods', async () => {
    sequelize.query.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/moods');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
