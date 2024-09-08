"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, lastName, email, password } = req.body;
        console.log(req.body);
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "User already exists" });
        }
        if (!firstName || !email || !password) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "All fields are required" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        let token = jsonwebtoken_1.default.sign({ email }, "secretkey", { expiresIn: "1h" });
        const newuser = yield userModel_1.default.create({
            firstName,
            lastName: lastName,
            email,
            password: hashedPassword,
        });
        res
            .status(constants_1.STATUS_CODES.CREATED)
            .json({ message: "User created successfully", user: newuser, token: token });
    }
    catch (error) {
        res.status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "All fields are required" });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const check = yield bcryptjs_1.default.compare(password, user.password);
        if (!check) {
            return res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({ message: "Invalid credentials" });
        }
        if (!user) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        let token = jsonwebtoken_1.default.sign({ email }, "secretkey", { expiresIn: "12h" });
        res
            .status(constants_1.STATUS_CODES.OK)
            .json({ message: "Login successful", user: user, token: token });
    }
    catch (error) {
        console.log(error);
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.default = { register, login };
