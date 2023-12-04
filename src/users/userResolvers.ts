// userResolvers.ts
import {UserInterface as User } from '../interfaces/userInterface';
import {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
  deleteUserByIdService,
  getAllUsersService,
  comperepasswordService,
} from './userService';
import * as JWT from '../jwt/jwt';
import { generateUniqueCode } from '../nodemailer/nodemailer';
import { generateUserPassword } from "../bycrypt/bycrypt";
import { sendemail } from "../nodemailer/nodemailer";

export const userResolvers = {
  registerUser: async (args: User ): Promise<{ user: User; accessToken: string }> => {
    try {
      const registerUser: User = args;
      registerUser.password = generateUserPassword(registerUser.password);
      const user = await registerService(registerUser);
      if (user) {
        const accessToken = JWT.generateAccessToken(user);
        return { user, accessToken };
      } else {
        throw new Error('No Users found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Server error while registering user');
    }
  },

  forgotPassword: async (args: { email: string }): Promise<string> => {
    const emailToReset = args.email;
    console.log(emailToReset, 'emailtoreset');
    const code = generateUniqueCode();
    try {
      sendemail(emailToReset, code);
      const result = forgotPasswordService(emailToReset, code);
      return 'Email sent with instructions to reset your password.';
    } catch (error) {
      console.error('Error sending email', error);
      throw new Error('Internal Server Error');
    }
  },

  comperepassword: async (args: { email: string; code: string }): Promise<string> => {
    const emailToReset = args.email;
    const code = args.code;
    try {
      const result = comperepasswordService(emailToReset, code);
      return 'Success';
    } catch (error) {
      console.error('Error ', error);
      throw new Error('Internal Server Error');
    }
  },

  resetPassword: async (args: { email: string; password: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const { email, password } = args;
      const result = await resetPasswordService(email, password);
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Internal Server Error');
    }
  },

  login: async (args:  User ): Promise<{ user: User; accessToken: string }> => {
    try {
      const logInUser: User = args;
      const user = await loginService(logInUser);
      if (user) {
        const accessToken = JWT.generateAccessToken(user);
        return { user, accessToken };
      }
      throw new Error('Incorrect email or password');
    } catch (error) {
      console.error(error);
      throw new Error('Server error while logging in');
    }
  },

  deleteUser: async (args:any) => {
    try {
      const userId = args.id;
      const deleteUserId = await deleteUserByIdService(Number(userId));
      return `${deleteUserId} user deleted successfully`;
    } catch (error) {
      console.error(error);
      throw new Error('Server error while deleting user');
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const allUsers = await getAllUsersService();
      if (allUsers === undefined) {
        throw new Error('Failed to retrieve user data');
      }
      return allUsers;
    } catch (error) {
      console.error(error);
      throw new Error('Server error while getting all users');
    }
  },
};
