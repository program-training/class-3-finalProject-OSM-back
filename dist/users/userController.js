"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.getAllUsersController = exports.deleteUserByUserEmail = exports.loginController = exports.resetPassword = exports.forgotPassword = exports.registerController = void 0;
=======
exports.deleteUserByUserEmail = exports.loginController = exports.resetPassword = exports.forgotPassword = exports.registerController = void 0;
>>>>>>> develop
const userService_1 = require("./userService");
const bycrypt_1 = require("../bycrypt/bycrypt");
const JWT = __importStar(require("../jwt/jwt"));
const nodemailer_1 = require("../nodemailer/nodemailer");
const nodemailer_2 = require("../nodemailer/nodemailer");
const registerController = async (req, res) => {
    try {
        const registerUser = req.body;
        registerUser.password = (0, bycrypt_1.generateUserPassword)(registerUser.password);
        const user = await (0, userService_1.registerService)(registerUser);
        if (user) {
            const accessToken = JWT.generateAccessToken(user);
            const refreshToken = JWT.generateRefreshToken(user);
            JWT.refreshTokens.push(refreshToken);
            return res.status(200).json({
                users: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        else {
            return res.status(404).json({ message: "No Users found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while retrieving users" });
    }
};
exports.registerController = registerController;
const forgotPassword = async (req, res) => {
    const emailToReset = req.body.email;
    const code = (0, nodemailer_1.generateUniqueCode)();
    try {
        (0, nodemailer_2.sendemail)(emailToReset, code);
        const result = (0, userService_1.forgotPasswordService)(emailToReset, code);
        res.send("Email sent with instructions to reset your password.");
    }
    catch (error) {
        console.error("Error sending email", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await (0, userService_1.resetPasswordService)(email, newPassword);
        res
            .status(200)
            .json({ success: true, message: "Password reset successful" });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.resetPassword = resetPassword;
const loginController = async (req, res) => {
    try {
        const logInUser = req.body;
        const user = await (0, userService_1.loginService)(logInUser);
        if (user) {
            const accessToken = JWT.generateAccessToken(user);
            const refreshToken = JWT.generateRefreshToken(user);
            JWT.refreshTokens.push(refreshToken);
            return res
                .status(200)
                .json({
                users: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        return res.status(404).json({ message: "Incorrect email or password" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error while retrieving users" });
    }
};
exports.loginController = loginController;
const deleteUserByUserEmail = async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const deleteUserEmail = await (0, userService_1.deleteUserByEmailService)(userEmail);
        res.send({ message: 'user deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error while delete user" });
    }
};
exports.deleteUserByUserEmail = deleteUserByUserEmail;
<<<<<<< HEAD
const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await (0, userService_1.getAllUsersService)();
        res.status(200).json({ user: allUsers });
    }
    catch (error) {
        res.status(500).json({ error: "Server error while get all users" });
    }
};
exports.getAllUsersController = getAllUsersController;
=======
>>>>>>> develop
