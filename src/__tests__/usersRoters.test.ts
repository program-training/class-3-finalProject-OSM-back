// import request from 'supertest';
// import app from '../server';

// describe('User routes', () => {
//   let server: any;

//   beforeAll(async () => {
//     server = app.listen(8200);
//   });

//   afterAll(done => {
//     server.close(done);
//   });

//   test('Register a new user', async () => {
//     const newUser = {
//       "email": 'test@exampleelchiCohen.com',
//       "password": 'testpassword',
//       'isadmin': false,
//     };

//     const res = await request(app)
//       .post('/api/users/register')
//       .send(newUser) 
//       .expect(200);
//     expect(res.body.users).toBeDefined();
//     expect(res.body.users.email).toEqual(newUser.email);
//   });
// });
