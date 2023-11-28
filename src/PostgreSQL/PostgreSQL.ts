import { Pool } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_USERNAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function checkConnection() {
  let client;
  try {
    client = await pool.connect();
    console.log("conenct to PostgreSQL")
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", (error as Error).message);
  } finally {
    if (client) {
      client.release();
    }
  }
}
export default pool;
