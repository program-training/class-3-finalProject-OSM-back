import request from "supertest";
import app from "../src/server";
const { pool } = require("../src/db");

async function setupTestDatabase() {
  await pool.query("CREATE DATABASE testdb");

  const testPool = new Pool({
    user: "your_db_user",
    host: "localhost",
    database: "testdb",
    password: "your_db_password",
    port: 5432,
  });

  await testPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isadmin BOOLEAN DEFAULT false,
      resetcode VARCHAR(255),
      registration_time TIMESTAMP
    );
  `);

  await testPool.end();
}

async function resetTestDatabase() {
  await pool.query("DROP DATABASE IF EXISTS testdb");
}

beforeAll(async () => {
  await setupTestDatabase();
});

afterAll(async () => {
  await resetTestDatabase();
});

const server = request("http://oms-back:8081");

describe("User Controller", () => {
  test("Log in an existing user", async () => {
    const existingUser = {
      email: "elchide@gmail.com",
      password: "1234567e",
      isadmin: "false",
    };

    const res = await server
      .post("/api/users/login")
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
