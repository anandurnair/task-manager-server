"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRouter = express_1.default.Router();
// Standard signup and login routes
authRouter.post('/signup', authController_1.default.register);
authRouter.post('/login', authController_1.default.login);
// Google OAuth routes
authRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET || "secretkey", { expiresIn: '1h' });
    res.status(200).json({ message: 'Google login successful', user, token });
});
exports.default = authRouter;
