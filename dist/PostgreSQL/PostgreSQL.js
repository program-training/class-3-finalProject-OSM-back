"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
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
        console.log(chalk_1.default.yellowBright('Connected to PostgreSQL database'));
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
