"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDal = exports.registerDal = exports.createUsersTable = void 0;
const PostgreSQL_1 = __importDefault(require("../PostgreSQL/PostgreSQL"));
const bycrypt_1 = require("../bycrypt/bycrypt");
async function createUsersTable() {
    try {
        await PostgreSQL_1.default.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isadmin BOOLEAN DEFAULT false)
    `);
    }
    catch (error) {
        console.error("Error creating users table:", error.message);
    }
}
exports.createUsersTable = createUsersTable;
async function registerDal(user) {
    const client = await PostgreSQL_1.default.connect();
    try {
        const existingUserCheck = await client.query("SELECT * FROM users WHERE email = $1", [user.email]);
        if (existingUserCheck.rows.length > 0) {
            throw new Error("User with this email already exists.");
        }
        const result = await client.query("INSERT INTO users (email, password, isadmin) VALUES ($1, $2, $3) RETURNING *", [user.email, user.password, user.isadmin || false]);
        if (result.rows.length > 0) {
            const insertedUser = result.rows[0];
            return insertedUser;
        }
        else {
            console.error("Error inserting user into the table.");
            return null;
        }
    }
    catch (error) {
        console.error("Error adding user to the table:", error.message);
        throw error;
    }
    finally {
        client.release();
    }
}
exports.registerDal = registerDal;
async function loginDal(userEmail, userPassword) {
    const client = await PostgreSQL_1.default.connect();
    try {
        const result = await client.query("SELECT * FROM users WHERE email = $1 ", [
            userEmail
        ]);
        if (result.rows.length > 0) {
            const userById = result.rows[0];
            if ((0, bycrypt_1.comparePassword)(userPassword, userById.password)) {
                return userById;
            }
        }
        else {
            console.error("Incorrect email or password");
            return null;
        }
    }
    catch (error) {
        console.error("Error getting user by ID:", error.message);
        return null;
    }
    finally {
        client.release();
    }
}
exports.loginDal = loginDal;
