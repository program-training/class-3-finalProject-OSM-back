import { UserInterface } from "../interfaces/userInterface";
import { loginDal, registerDal,forgotPasswordDal,resetPasswordDal } from "../users/userDal";
import { generateUserPassword } from "../bycrypt/bycrypt";
export const registerService = async (user: UserInterface) => {
  try {
    const result = await registerDal(user);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
export const forgotPasswordService=async(email:string,code:string)=>{
  try {
    const result = await forgotPasswordDal(email,code);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
}
export const resetPasswordService=async(email:string,newPassword:string)=>{
  try {
    const newPasswordBycrypt=generateUserPassword(newPassword)
    const result = await resetPasswordDal(email,newPasswordBycrypt);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
}

  export const loginService = async (user: UserInterface) => {
    try {
      const result = await loginDal(user.email,user.password);
      return result;
    } catch (err) {
      console.error("Error reading data:(service)", err);
      throw err;
    }
  };
  
