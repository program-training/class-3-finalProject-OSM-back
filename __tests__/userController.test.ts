import request from "supertest";
import { Request } from "express";
import app from "../src/server";
import {createUsersTable} from "../src/users/userDal"

const server=request('http://oms-class3:8081')
describe('User Controller', () => {
  test('Log in an existing user', async () => {
    await createUsersTable();
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
