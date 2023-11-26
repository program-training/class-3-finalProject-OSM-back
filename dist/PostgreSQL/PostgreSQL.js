"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_USERNAME,
    ssl: {
        rejectUnauthorized: false,
    },
});
async function checkConnection() {
    let client;
    try {
        client = await pool.connect();
    }
    catch (error) {
        console.error("Error connecting to PostgreSQL:", error.message);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
checkConnection();
exports.default = pool;
