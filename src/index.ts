import express, { Request, Response } from "express";
import dbConnection from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from 'cors';
dotenv.config();
const app = express();

const PORT = 4000;
dbConnection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });   
//routes
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
