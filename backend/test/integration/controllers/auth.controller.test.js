const supertest = require('supertest');
const Server = require('../../../classes/Server');
const User = require('../../../models/User');

const app = Server().express;

describe('User Controller Tests', () => {

  describe('POST /signup', () => {
    test('should create a new user and return 201', async () => {
      const response = await supertest(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          company: 'Test Company'
        })
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
    });

    test('should return 422 if user already exists', async () => {
      const existingUser = new User({
        email: 'alreadythere@example.com',
        password: 'Password123',
        company: 'Test Company'
      });
      await existingUser.save();

      const response = await supertest(app)
        .post('/api/auth/signup')
        .send({
          email: 'alreadythere@example.com',
          password: 'Password123',
          company: 'Test Company'
        })
        .expect(422);

      expect(response.body).toBe('There is already an user with that email.');
    });
  });

  describe('POST /login', () => {
    test('should log in an existing user and return a token', async () => {

      const response = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
    });

    test('should return 401 if password is incorrect', async () => {
      const user = new User({
        email: 'login@example.com',
        password: '$2a$12$examplehash',
        company: 'Test Company'
      });
      await user.save();

      const response = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toBe('Password is wrong, try again.');
    });
  });
});