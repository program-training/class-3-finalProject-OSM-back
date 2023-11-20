import UserModel from "../mongoDB/Schemas/UserSchema";
import { handleDBResponseError } from "../utils/handleErrors";
import { UserInterface, UserLoginInterface } from "./interfaces/UserInterface";

type CollectionResult = Promise<Record<string, unknown>[] | Error>;

export const createUser = async (userData: UserInterface) => {
  try {
    const user = new UserModel({
      ...userData
    });
    user.isNew = true;
    await user.save();
    return user;
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUsers = async (): CollectionResult => {
  try {
    return UserModel.find({});
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUserById = async (id: UserInterface['id']) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) throw new Error('User Not Found!');
    return user;
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUserByEmail = async (email: UserLoginInterface['email']) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error('User Not Found!');
    return user;
  } catch (error) {
    return handleDBResponseError(error);
  }
};
