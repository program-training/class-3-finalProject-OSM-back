import request from "supertest";
import { Request } from "express";
import app from "../src/server";

const server=request('http://localhost:8080')
describe('User Controller', () => {
  let userId:Number;
  test('register a new user', async () => {
    const existingUser = {
      "email":"elchide1@gmail.com","password":"1234567e","isadmin":"false"
    };

    const res = await server
      .post('/api/users/register')
      .send(existingUser)
      .timeout(10000)
      .expect(200);
      expect(res.body.users).toBeDefined();
      const { users, accessToken, refreshToken } = res.body; 
      userId = users.id;
      expect(users).toBeDefined(); 
      expect(users.id).toBeDefined(); 
      expect(users.email).toEqual(existingUser.email);

      const deleteResponse = await server
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});