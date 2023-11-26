import request from "supertest";
import { Request } from "express";
// import express from "express";
import app from "../src/server";
// import { registerController } from "../users/userController"; 
// import { loginController } from "../users/userController";
// const app = express();
// app.use(express.json()); 

// app.post('/api/users/register', registerController);
// app.post('api/users/login',loginController)
const server=request('http://localhost:8080')
describe('User Controller', () => {
  test('Register a new user', async () => {
    const newUser = {"email":"eeg18PqwLOuYTrr76rd@gmail.com","password":"1234567e","isadmin":"false"}

    const response = await server
      .post('/api/users/register')
      .send(newUser)
      .timeout(10000)
      .expect(200);
      
    const { users } = response.body;
    expect(users).toBeDefined();
    expect(response.body.users.email).toEqual(newUser.email);
  });
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