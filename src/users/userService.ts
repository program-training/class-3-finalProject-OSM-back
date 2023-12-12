import { UserInterface } from "../interfaces/userInterface";
import {
  loginDal,
  registerDal,
  deleteUserByIdDal,
  forgotPasswordDal,
  resetPasswordDal,
  getAllUsersDal,
  comperepasswordDal,
  getTimeRegisterDal,
} from "../users/userDal";
import { generateUserPassword } from "../bycrypt/bycrypt";
import { resolversinterface } from "../interfaces/resolverinterface";

export const registerService = async (user: UserInterface) => {
  try {
    const result = await registerDal(user);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
export const forgotPasswordService = async (email: string, code: string) => {
  try {
    const result = await forgotPasswordDal(email, code);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
export const comperepasswordService = async (email: string, code: string) => {
  try {
    const result = await comperepasswordDal(email, code);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
export const resetPasswordService = async (
  email: string,
  newPassword: string
) => {
  try {
    const newPasswordBycrypt = generateUserPassword(newPassword);
    const result = await resetPasswordDal(email, newPasswordBycrypt);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};

  export const loginService = async (user: UserInterface) => {
    try {
      const result = await loginDal(user.email as string,user.password as string);
      console.log(result);
      return result;
    } else {
      console.error("User email is undefined");
      return null;
    }
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
export const getAllUsersService = async () => {
  try {
    const users = await getAllUsersDal();
    return users;
  } catch (arr) {
    console.error("Error get all users:(service)", arr);
    throw arr;
  }
};

export const getTimeRegisterService = async () => {
  try {
    const registrations = await getTimeRegisterDal();
    return registrations;
  } catch (error) {
    console.error("Error in getTimeRegisterController:", error);
    throw error;
  }
};
