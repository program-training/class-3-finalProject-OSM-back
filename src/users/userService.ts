import { UserInterface } from "../interfaces/userInterface";
import { loginDal, registerDal,deleteUserByEmailDal,getAllUsersDal } from "../users/userDal";

export const registerService = async (user: UserInterface) => {
  try {
    const result = await registerDal(user);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};

  export const loginService = async (user: UserInterface) => {
    try {
      const result = await loginDal(user.email,user.password);
      return result;
    } catch (err) {
      console.error("Error reading data:(service)", err);
      throw err;
    }
  };
  
  export const deleteUserByEmailService = async(userEmail:string) => {
    try{
      const deleteUser = await deleteUserByEmailDal(userEmail)
      return deleteUser
    }catch(arr){
      console.error("Error delete user:(service)",arr)
      throw arr
    }
  }

  export const getAllUsersService = async()=>{
    try{
      const users = await getAllUsersDal()
      return users
    }catch(arr){
      console.error("Error get all users:(service)",arr)
      throw arr
    }
  }