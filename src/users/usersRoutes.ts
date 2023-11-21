import  express  from "express";
import { createUsersTable } from "./userDal";
import { registerController,loginController } from "./userController";
const userRouter = express.Router();
createUsersTable()
userRouter.post("/register",registerController);
userRouter.post('/login',loginController);

export default userRouter