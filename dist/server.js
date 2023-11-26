"use strict";
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
require("dotenv").config();
const PostgreSQL_1 = __importDefault(require("./PostgreSQL/PostgreSQL"));
const mongoConnection_1 = __importDefault(require("./mongoDB/mongoConnection"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use("/api/users", usersRoutes_1.userRouter);
app.use("/api/orders", orderRoutes_1.default);
const PORT = 8080;
app.listen(PORT, async () => {
    console.log(chalk_1.default.blueBright(`Server listening on port: ${PORT}`));
    PostgreSQL_1.default;
    (0, mongoConnection_1.default)();
});
exports.default = app;
