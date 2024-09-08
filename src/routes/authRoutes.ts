import express, { Request, Response } from "express";
import authController from "../controllers/authController";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/userModel"; // Import User type if available

const authRouter = express.Router();

// Standard signup and login routes
authRouter.post('/signup', authController.register);
authRouter.post('/login', authController.login);

// Google OAuth routes
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    const user = req.user as any; 
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secretkey", { expiresIn: '1h' });
    res.status(200).json({ message: 'Google login successful', user, token });
  }
);

export default authRouter;
