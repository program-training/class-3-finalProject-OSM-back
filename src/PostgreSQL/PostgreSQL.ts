import chalk from "chalk";
import { Pool } from 'pg';
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_USERNAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkConnection() {
  let client;

  try {
    client = await pool.connect();
    // console.log(chalk.yellowBright('Connected to PostgreSQL database'));
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', (error as Error).message);
  } finally {
    if (client) {
      client.release();
    }
  }
}
checkConnection();
export default pool