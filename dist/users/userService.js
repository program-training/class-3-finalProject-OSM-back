"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByEmailService = exports.loginService = exports.resetPasswordService = exports.comperepasswordService = exports.forgotPasswordService = exports.registerService = void 0;
const userDal_1 = require("../users/userDal");
const bycrypt_1 = require("../bycrypt/bycrypt");
const registerService = async (user) => {
    try {
        const result = await (0, userDal_1.registerDal)(user);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
};
exports.registerService = registerService;
const forgotPasswordService = async (email, code) => {
    try {
        const result = await (0, userDal_1.forgotPasswordDal)(email, code);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
};
exports.forgotPasswordService = forgotPasswordService;
const comperepasswordService = async (email, code) => {
    try {
        const result = await (0, userDal_1.comperepasswordDal)(email, code);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
};
exports.comperepasswordService = comperepasswordService;
const resetPasswordService = async (email, newPassword) => {
    try {
        const newPasswordBycrypt = (0, bycrypt_1.generateUserPassword)(newPassword);
        const result = await (0, userDal_1.resetPasswordDal)(email, newPasswordBycrypt);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
};
exports.resetPasswordService = resetPasswordService;
const loginService = async (user) => {
    try {
        const result = await (0, userDal_1.loginDal)(user.email, user.password);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
};
exports.loginService = loginService;
const deleteUserByEmailService = async (userEmail) => {
    try {
        const deleteUser = await (0, userDal_1.deleteUserByEmailDal)(userEmail);
        return deleteUser;
    }
    catch (arr) {
        console.error("Error delete user:(service)", arr);
        throw arr;
    }
};
exports.deleteUserByEmailService = deleteUserByEmailService;
