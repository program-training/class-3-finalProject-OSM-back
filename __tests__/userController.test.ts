import request from 'supertest';
import server from '../src/server';

const serverRequest = request(server); // Use the server object

describe('User Controller', () => {
  let userId: number;

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

      const deleteResponse = await server
        .delete(`/api/users/${userId}`)
        .expect(200);

      console.log('Delete Response:', deleteResponse.status, deleteResponse.body);
    } catch (error) {
      console.error('Test Error:', error);
      throw error;  // Rethrow the error to fail the test
    }
  });

  // Add an afterAll block to close the Express server
  afterAll(async () => {
      await new Promise(resolve => server.close(resolve));
    });
  });
});

