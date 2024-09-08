import express from "express";
import dbConnection from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from 'cors';

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
