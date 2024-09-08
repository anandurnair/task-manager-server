"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskRouter = express_1.default.Router();
const taskController_1 = __importDefault(require("../controllers/taskController"));
const auth_1 = __importDefault(require("../middleware/auth"));
// Apply authentication middleware to all routes
taskRouter.use(auth_1.default);
// Route to add a new task
taskRouter.post('/addTask', taskController_1.default.addTask);
// Route to get all tasks for a specific user
taskRouter.get('/getAllTasks/:userId', taskController_1.default.getAllTasks);
// Route to get a specific task for a user
taskRouter.get('/getTask/:userId/:id', taskController_1.default.getTask);
// Route to update a specific task for a user
taskRouter.put('/updateTask/:userId/:taskId', taskController_1.default.updateTask);
// Route to delete a specific task for a user
taskRouter.delete('/deleteTask/:userId/:taskId', taskController_1.default.deleteTask);
// Route to update the status of a specific task for a user
taskRouter.put('/updateStatus/:userId/:taskId', taskController_1.default.updateStatus);
exports.default = taskRouter;
