import request from "supertest";
import app from "../src/server";

const server = request(app);

describe('User Controller', () => {
  let userId: number;

  afterEach(async () => {
    if (userId) {
      // Delete the user after each test
      await server.delete(`/api/users/${userId}`).expect(200);
    }
  });

  test('register a new user', async () => {
    const existingUser = {
      "email": "elchide1@gmail.com",
      "password": "1234567e",
      "isadmin": "false"
    };

    try {
      const res = await server
        .post('/api/users/register')
        .send(existingUser)
        .timeout(10000)
        .expect(200);

      console.log('Registration Response:', res.status, res.body);

      expect(res.body.users).toBeDefined();
      const { users, accessToken, refreshToken } = res.body;
      userId = users.id;

      expect(users).toBeDefined();
      expect(users.id).toBeDefined();
      expect(users.email).toEqual(existingUser.email);
    } catch (error) {
      console.error('Test Error:', error);
      throw error;  // Rethrow the error to fail the test
    }
  });

  afterAll(async () => {
    // Close the app after all tests
    await app.close();
  });
});


