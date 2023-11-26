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
        isadmin BOOLEAN DEFAULT false,
        resetcode VARCHAR (255)
        )
   
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
export async function forgotPasswordDal(email: string, code: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE users SET resetcode = $1 WHERE email = $2 RETURNING *",
      [code, email]
    );

    if (result.rows.length > 0) {
      const insertedUser: UserInterface = result.rows[0];
      return insertedUser;
    } else {
      console.error("Error inserting user into the table.");
      return null;
    }
  } catch (error) {
    console.error("Error adding code to the table:", (error as Error).message);
    throw error;
  } finally {
    client.release();
  }
}
export async function resetPasswordDal(email: string, newPassword: string) {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE users SET password = $1, resetcode = NULL WHERE email = $2",
      [newPassword, email]
    );
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  } finally {
    client.release();
  }
}
export async function loginDal(userEmail: string, userPassword: string) {
  const client = await pool.connect();

  try {
    const result = (await client.query(
      "SELECT * FROM users WHERE email = $1 ",
      [userEmail]
    )) as { rows: UserInterface[] };

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
