"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error("MONGO_URL non definita");
}
mongoose_1.default.connect(MONGO_URL).then(() => {
    const PORT = process.env.PORT || 3000;
    (0, http_1.createServer)(app_1.default).listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});
