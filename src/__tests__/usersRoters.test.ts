// // import request from 'supertest';
// // import app from '../server';
// // import express from "express";
// // describe('User routes', () => {
// //   let server: any;

// //   beforeAll(async () => {
// //     server = app.listen(8200);
// //   });

// //   afterAll(done => {
// //     server.close(done);
// //   });

// //   test('Register a new user', async () => {
// //     const newUser = {
// //       "email": 'test@examepleelchiCohen.com',
// //       "password": 'testpassword',
// //       'isadmin': false,
// //     };

// //     const res = await request(app)
// //       .post('/api/users/register')
// //       .send(newUser) 
// //       .expect(200);
//     // expect(res.body.users).toBeDefined();
//     // expect(res.body.users.email).toEqual(newUser.email);
// //   });
// // });
// // server.test.js
// import supertest from 'supertest';
// import app from '../server'; 

// const request = supertest(app);

// describe('Server Tests', () => {
//     let server: any;

//   beforeAll(async () => {
//     server = app.listen(8200);
//   });

//   afterAll(done => {
//     server.close(done);
//   });
//   it('should register a new user', async () => {
//     const response = await request
//       .post('/api/users/register')
//       .send({"email":"elchi362iuerpe@egmail.com","password":"1234567e","isadmin":"false"}
        
//     ).timeout(10000);

//     expect(response.status).toBe(200);
  
//     // expect(response.body).toHaveProperty(['users']);
//     // expect(response.body).toHaveProperty(['users']);
//   });

//   it('should log in a user', async () => {
//     const response = await request
//       .post('/api/users/login')
//       .send({"email":"elchi35dtrre@gmail.com","password":"1234567e","isadmin":"false"}
        
//       ).timeout(10000);

//     // expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty(['users']);
//     expect(response.body).toHaveProperty(['users']);
//   });

// });
