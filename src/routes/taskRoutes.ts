import express from "express";
const taskRouter = express.Router();
import taskController from "../controllers/taskController";
import authMiddleware from "../middleware/auth";
taskRouter.use( authMiddleware );
taskRouter.post('/addTask', taskController.addTask);
taskRouter.get('/getAllTasks', taskController.getAllTasks);
taskRouter.get('/getTask/:id', taskController.getTask);
taskRouter.put('/updateTask/:id', taskController.updateTask);
taskRouter.delete('/deleteTask/:id', taskController.deleteTask);
taskRouter.put('/updateStatus/:id', taskController.updateStatus);

export default taskRouter