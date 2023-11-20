import { comparePassword} from "../helpers/bcrypt";
import { createUser, readUserByEmail, readUserById, readUsers } from "../dal";
import chalk from "chalk";
import { UserInterface, UserLoginInterface } from "../interfaces/UserInterface";
import jwt from 'jsonwebtoken';
import { hash } from "bcryptjs";

type UserResult = Promise<UserInterface | null | unknown>;


export const loginService = async (user: UserLoginInterface): UserResult => {
  try {
    
    const userByEmailFromDB = await readUserByEmail(user.email);
    if (comparePassword(user.password, userByEmailFromDB.password)) { // 
      if (process.env.ACCESS_TOKEN_JWT) {
        const userAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_JWT)
        const userByEmail = await readUserByEmail(user.email)
        return Promise.resolve(JSON.stringify({"token": userAccessToken, "user": userByEmail}))
      }
      else {
        return Promise.reject(new Error("server error: ACCESS_TOKEN_JWT not found"));
      }
    }
    else {
      return Promise.reject(new Error("Bad Authentication"));
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface): UserResult => {
  try {
    user.password = await hash(user.password, 10)
    return await createUser(user);
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

