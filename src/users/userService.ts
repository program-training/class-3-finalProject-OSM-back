import { UserInterface } from "../interfaces/userInterface";
import { loginDal, registerDal } from "../users/userDal";

export const registerService = async (user: UserInterface) => {
    try {
      const result = await registerDal(user);
      return result;
    } catch (err) {
      console.error("Error reading data:(service)", err);
      throw err;
    }
  };
