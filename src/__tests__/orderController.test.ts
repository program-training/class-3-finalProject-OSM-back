import request from "supertest";
import express from "express";
import app from "../server";
// import { handleGetAllOrders } from "../orders/orderController"; 
// const app = express();
// app.use(express.json()); 

// app.get('/api/orders', handleGetAllOrders);

describe('order Controller', () => {
  test('getting all orders', async () => {

    const response = await request(app)
      .get('/api/orders/')
      .timeout(100000)
      .expect(200);
      const orders = response.body; 
      expect(orders).toBeDefined();
  });
  test('getting order by user id ', async () => {
    const id=12345
    const res = await request(app)
      .get(`/api/orders/${id}`)
      .timeout(10000)
      .expect(200);
      expect(res.body.users).toBeDefined();
      const { users, accessToken, refreshToken } = res.body; 
      expect(users).toBeDefined(); 
      expect(users.id).toBeDefined(); 
  });
});
