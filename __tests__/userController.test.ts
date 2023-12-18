import request from "supertest";
import { Request } from "express";
import app from "../src/server";

const server=request('http://oms-back:8081')
describe('User Controller', () => {
  test('Log in an existing user', async () => {
    const existingUser = {
      "email":"elchide@gmail.com","password":"1234567e","isadmin":"false"
    };

    const res = await server
      .post('/api/users/login')
      .send(existingUser)
      .timeout(10000)
      .expect(200);
      expect(res.body.users).toBeDefined();
      const { users, accessToken, refreshToken } = res.body; 
      expect(users).toBeDefined(); 
      expect(users.id).toBeDefined(); 
      expect(users.email).toEqual(existingUser.email);
  });
});
