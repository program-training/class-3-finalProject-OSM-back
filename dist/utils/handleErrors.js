"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDBResponseError = exports.handleError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const handleError = (res, error, status = 400) => {
    if (error && error instanceof Error)
        return res.status(status).send(error.message);
    return res.status(status).send("Oops... an error accorded");
};
exports.handleError = handleError;
const handleDBResponseError = (error) => {
    if (error instanceof Error)
        return Promise.reject(error);
    console.log(chalk_1.default.redBright(error));
    return Promise.reject(new Error("Something went wong!"));
};
exports.handleDBResponseError = handleDBResponseError;
