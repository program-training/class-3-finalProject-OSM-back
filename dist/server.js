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
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./users/usersRoutes");
const orderRoutes_1 = __importDefault(require("./orders/orderRoutes"));
const app = (0, express_1.default)();
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const PostgreSQL_1 = __importDefault(require("./PostgreSQL/PostgreSQL"));
const mongoConnection_1 = __importDefault(require("./mongoDB/mongoConnection"));
dotenv.config();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use("/api/users", usersRoutes_1.userRouter);
app.use("/api/orders", orderRoutes_1.default);
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(chalk_1.default.blueBright(`Server listening on port: ${PORT}`));
    PostgreSQL_1.default;
    (0, mongoConnection_1.default)();
});
exports.default = app;
