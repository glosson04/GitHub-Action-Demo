const request = require('supertest');
const { app } = require('../src/index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    test('should return API info', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('running');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /greet/:name', () => {
    test('should greet with provided name', async () => {
      const response = await request(app).get('/greet/john');
      expect(response.status).toBe(200);
      expect(response.body.greeting).toBe('Hello, John!');
    });

    test('should handle different names', async () => {
      const response = await request(app).get('/greet/alice');
      expect(response.status).toBe(200);
      expect(response.body.greeting).toBe('Hello, Alice!');
    });
  });

  describe('POST /calculate', () => {
    test('should calculate sum correctly', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ numbers: [1, 2, 3, 4, 5] });
      expect(response.status).toBe(200);
      expect(response.body.sum).toBe(15);
      expect(response.body.count).toBe(5);
    });

    test('should handle empty array', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ numbers: [] });
      expect(response.status).toBe(200);
      expect(response.body.sum).toBe(0);
      expect(response.body.count).toBe(0);
    });

    test('should handle negative numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ numbers: [-5, 10, -3] });
      expect(response.status).toBe(200);
      expect(response.body.sum).toBe(2);
    });

    test('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ numbers: 'not an array' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /validate-email', () => {
    test('should validate correct email', async () => {
      const response = await request(app)
        .post('/validate-email')
        .send({ email: 'test@example.com' });
      expect(response.status).toBe(200);
      expect(response.body.isValid).toBe(true);
    });

    test('should reject invalid email', async () => {
      const response = await request(app)
        .post('/validate-email')
        .send({ email: 'invalid-email' });
      expect(response.status).toBe(200);
      expect(response.body.isValid).toBe(false);
    });

    test('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/validate-email')
        .send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
