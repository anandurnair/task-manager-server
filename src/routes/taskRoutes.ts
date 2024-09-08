import express from "express";
const taskRouter = express.Router();
import taskController from "../controllers/taskController";
import authMiddleware from "../middleware/auth";

// Apply authentication middleware to all routes
taskRouter.use(authMiddleware);

// Route to add a new task
taskRouter.post('/addTask', taskController.addTask);

// Route to get all tasks for a specific user
taskRouter.get('/getAllTasks/:userId', taskController.getAllTasks);

// Route to get a specific task for a user
taskRouter.get('/getTask/:userId/:id', taskController.getTask);

// Route to update a specific task for a user
taskRouter.put('/updateTask/:userId/:taskId', taskController.updateTask);

// Route to delete a specific task for a user
taskRouter.delete('/deleteTask/:userId/:taskId', taskController.deleteTask);

// Route to update the status of a specific task for a user
taskRouter.put('/updateStatus/:userId/:taskId', taskController.updateStatus);

export default taskRouter;
