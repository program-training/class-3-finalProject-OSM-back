import request from "supertest";
import express from "express";
import { registerController } from "../users/userController"; // Replace with the actual path
// import app from "../server";
// const app = express();
// app.use(express.json());

// app.post("/api/users/register", registerController);/

// describe("User Controller", () => {
//   let server: any;
//   beforeAll(async () => {
//     server = app.listen(8300);
//   });

//   afterAll((done) => {
//     server.close(done);
//   });
//   test("Register a new user", async () => {
//     const newUser = {
//       email: "test@exampleklyyu.com",
//       password: "testpassword",
//       isadmin: false,
//     };
//     const response = await request(app)
//       .post("/api/users/register")
//       .send(newUser)
//     //   .expect(200);
//     // expect(response.body.users).toBeDefined();
//     // expect(response.body.users.email).toEqual(newUser.email);
//   });
// });


const app = express();
app.use(express.json()); 

app.post('/api/users/register', registerController);

describe('User Controller', () => {
  test('Register a new user', async () => {
    const newUser = {
      email: 'test@example3.com',
      password: 'testpassword',
      isadmin: false,
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser)
      .expect(200);
    expect(response.body.users).toBeDefined();
    expect(response.body.users.email).toEqual(newUser.email);
  });
});