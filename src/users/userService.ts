import { UserInterface } from "./userInterface";
import { loginDal, registerDal } from "./userDal";

export const registerService = async (user: UserInterface) => {
    try {
      const result = await registerDal(user);
      return result;
    } catch (err) {
      console.error("Error reading data:(service)", err);
      throw err;
    }
  };
