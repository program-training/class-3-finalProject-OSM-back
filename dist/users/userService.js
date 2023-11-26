"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const userDal_1 = require("../users/userDal");
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
