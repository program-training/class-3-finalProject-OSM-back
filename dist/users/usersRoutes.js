"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const validation_1 = require("../validation/validation");
const rateLimiter_1 = require("../rateLimiter/rateLimiter");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/', userController_1.getAllUsersController);
exports.userRouter.post("/register", validation_1.validateUser, userController_1.registerController);
<<<<<<< HEAD
exports.userRouter.post("/login", rateLimiter_1.limiter, validation_1.validateUser, userController_1.loginController);
exports.userRouter.post('/forgotpassword', userController_1.forgotPassword);
exports.userRouter.post('/resetpaasword', userController_1.resetPassword);
exports.userRouter.delete("/:userEmail", userController_1.deleteUserByUserEmail);
=======
exports.userRouter.post("/login", rateLimiter_1.default, validation_1.validateUser, userController_1.loginController);
exports.userRouter.delete("/:userEmail", userController_1.deleteUserByUserEmail);
exports.userRouter.post('/forgotpassword', userController_1.forgotPassword);
exports.userRouter.post('/resetpaasword', userController_1.resetPassword);
>>>>>>> develop
