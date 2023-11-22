import { UserInterface } from "../interfaces/userInterface";
import { loginDal, registerDal } from "../users/userDal";

export const registerService = async (user: UserInterface) => {
  try {
    const result = await registerDal(user);
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};

export const loginService = async (user: UserInterface) => {
  try {
    const result = await loginDal(user.email);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
