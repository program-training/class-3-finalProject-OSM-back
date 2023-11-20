import  express  from "express";
import { createUsersTable } from "./userDal";
import { registerController } from "./userController";
const userRouter = express.Router();
createUsersTable()
userRouter.post("/register",registerController);
userRouter.post('/login');

export default userRouter