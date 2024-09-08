"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnection() {
    const URL = process.env.MONGO_URL;
    mongoose_1.default.connect(URL)
        .then(() => console.log('Connection successful'))
        .catch((err) => console.log(err));
}
exports.default = dbConnection;
