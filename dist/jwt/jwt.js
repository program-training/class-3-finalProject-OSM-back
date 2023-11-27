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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.verifyAdminToken = exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = exports.refreshTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.refreshTokens = [];
const generateAccessToken = (user) => {
    let secretKey = process.env.SECRET_TOKEN_KEY;
    return jsonwebtoken_1.default.sign(user, secretKey);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    const secretKey = process.env.SECRET_REFRESH_TOKEN_KEY;
    return jsonwebtoken_1.default.sign(user, secretKey);
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.json("no token found").sendStatus(401);
    }
    const secretKey = process.env.SECRET_TOKEN_KEY;
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err)
            return res.json({ message: "Token verification failed" }).sendStatus(403);
        req.body.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.json("no token found").sendStatus(401);
    }
    const secretKey = process.env.SECRET_TOKEN_KEY;
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.json({ message: "Token verification failed" }).sendStatus(403);
        }
        else if (user.isadmin) {
            req.body.user = user;
            next();
        }
        else {
            return res.json({ message: "allow only for admin" }).sendStatus(406);
        }
    });
};
exports.verifyAdminToken = verifyAdminToken;
const refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    if (!exports.refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    const secretKey = process.env.SECRET_REFRESH_TOKEN_KEY;
    jsonwebtoken_1.default.verify(refreshToken, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = (0, exports.generateAccessToken)(user);
        res.json({ accessToken: accessToken });
    });
};
exports.refreshToken = refreshToken;
