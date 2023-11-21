
// import { Client } from 'pg';
// export default async function connectToDatabase() {
//   const connectionString = `postgres://${process.env.DATABASE_USERNAME}:${process.env.PASSWORD_TO_POSTGRES}@dpg-cldimnmg1b2c73f7ul1g-a.oregon-postgres.render.com/users_cwmw`;

//   const client = new Client({
//     connectionString: connectionString,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });

//   try {
//     await client.connect();
//     console.log('Connected to PostgreSQL database');
//   } catch (error) {
//     console.error('Error connecting to PostgreSQL:', (error as Error).message);
//   } finally {
//     await client.end();
//   }
// }
import chalk from "chalk";
import { Pool } from 'pg';
require('dotenv').config();
const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USERNAME}:${process.env.PASSWORD_TO_POSTGRES}@dpg-cldimnmg1b2c73f7ul1g-a.oregon-postgres.render.com/users_cwmw`,
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