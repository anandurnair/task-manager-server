import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
    id: string;
    name: string;
}

// declare global {
//     namespace Express {
//         interface Request {
//             user?: any | jwt.JwtPayload;
//         }
//     }
// }

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as any | jwt.JwtPayload;  
        req.user = decoded;  
        next();  
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

export default auth;
