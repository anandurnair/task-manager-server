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
const taskModel_1 = __importDefault(require("../models/taskModel")); // Import the new UserTasksModel
const constants_1 = require("../utils/constants");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { userId, taskName, taskDescription } = req.body;
        if (!userId || !taskName || !taskDescription) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "All fields are required" });
        }
        let userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            userTasks = new taskModel_1.default({ userId, tasks: [] });
        }
        // Add the new task to the user’s task list
        userTasks.tasks.push({
            title: taskName,
            description: taskDescription,
            status: 'pending',
        });
        yield userTasks.save();
        res
            .status(constants_1.STATUS_CODES.CREATED)
            .json({ message: "Task created successfully", task: userTasks });
    }
    catch (error) {
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
});
// Function to get all tasks for a user
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log(userId);
        if (!userId) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "User ID is required" });
        }
        const userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "No tasks found for this user" });
        }
        res.status(constants_1.STATUS_CODES.OK).json({ tasks: userTasks.tasks });
    }
    catch (error) {
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
// Function to update a task for a user
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        const { title, description } = req.body;
        if (!userId || !taskId || !title || !description) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "All fields are required" });
        }
        const userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const task = userTasks.tasks.id(taskId);
        if (!task) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Task not found" });
        }
        task.title = title;
        task.description = description;
        yield userTasks.save();
        res
            .status(constants_1.STATUS_CODES.OK)
            .json({ message: "Task updated successfully", task });
    }
    catch (error) {
        console.log(error);
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
// Function to delete a task for a user
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        if (!userId || !taskId) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "User ID and Task ID are required" });
        }
        // Find the user's tasks
        const userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        // Find and remove the task
        const taskIndex = userTasks.tasks.findIndex((task) => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Task not found" });
        }
        userTasks.tasks.splice(taskIndex, 1); // Remove the task from the array
        yield userTasks.save(); // Save the updated userTasks document
        res
            .status(constants_1.STATUS_CODES.OK)
            .json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
});
// Function to get a specific task for a user
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        if (!userId || !taskId) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "User ID and Task ID are required" });
        }
        const userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const task = userTasks.tasks.id(taskId);
        if (!task) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Task not found" });
        }
        res.status(constants_1.STATUS_CODES.OK).json({ task });
    }
    catch (error) {
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
});
// Function to update the status of a task
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        const { status } = req.body;
        if (!userId || !taskId || !status) {
            return res
                .status(constants_1.STATUS_CODES.BAD_REQUEST)
                .json({ message: "User ID, Task ID, and status are required" });
        }
        const userTasks = yield taskModel_1.default.findOne({ userId });
        if (!userTasks) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const task = userTasks.tasks.id(taskId);
        if (!task) {
            return res
                .status(constants_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Task not found" });
        }
        task.status = status;
        yield userTasks.save();
        res
            .status(constants_1.STATUS_CODES.OK)
            .json({ message: "Task status updated successfully", task });
    }
    catch (error) {
        res
            .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
});
exports.default = { addTask, getTask, getAllTasks, updateTask, deleteTask, updateStatus };
