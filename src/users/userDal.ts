import { PoolClient } from "pg";
import pool from "../PostgreSQL/PostgreSQL";
import { UserInterface } from "../interfaces/userInterface";
import { comparePassword } from "../bycrypt/bycrypt";

export async function createUsersTable(): Promise<void> {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isadmin BOOLEAN DEFAULT false)
    `);

    // console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", (error as Error).message);
  }
}

export async function registerDal(
  user: UserInterface
): Promise<UserInterface | null> {
  const client = await pool.connect();

  try {
    const existingUserCheck = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );

    if (existingUserCheck.rows.length > 0) {
      throw new Error("User with this email already exists.");
    }
    const result = await client.query(
      "INSERT INTO users (email, password, isadmin) VALUES ($1, $2, $3) RETURNING *",
      [user.email, user.password, user.isadmin || false]
    );

    if (result.rows.length > 0) {
      const insertedUser: UserInterface = result.rows[0];
      return insertedUser;
    } else {
      console.error("Error inserting user into the table.");
      return null;
    }
  } catch (error) {
    console.error("Error adding user to the table:", (error as Error).message);
    throw error;
  } finally {
    client.release();
  }
}

export async function loginDal(userEmail: string,userPassword:string) {
  const client = await pool.connect();

  try {
    const result= await client.query("SELECT * FROM users WHERE email = $1 ", [
      userEmail
    ])as { rows: UserInterface[] };

      if (result.rows.length > 0) {
        const userById: UserInterface = result.rows[0];
        if (comparePassword(userPassword, userById.password)) {
          return userById;
      
        }
    } else {
      console.error("Incorrect email or password");
      return null;
    }
  } catch (error) {
    console.error("Error getting user by ID:", (error as Error).message);
    return null;
  } finally {
    client.release();
  }
}

export const deleteUserByEmailDal = async (email: string): Promise<void> => {
  const client = await pool.connect();

  try {
    const deleteUser = await client.query("DELETE FROM users WHERE email = $1", [email]);
    console.log(`User with email ${email} has been deleted.`);
    if (deleteUser.rowCount === 0) {
      console.log(`Order with ID ${email} not found`);
      throw new Error(`Order with ID ${email} not found!`);
    }
  } catch (error) {
    console.error("Error deleting user:", (error as Error).message);
    throw error;
  } finally {
    client.release();
  }
};
