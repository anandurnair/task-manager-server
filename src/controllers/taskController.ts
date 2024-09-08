import { Request, Response } from "express";
import UserTasksModel from "../models/taskModel"; // Import the new UserTasksModel
import { STATUS_CODES } from "../utils/constants";

const addTask = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { userId, taskName, taskDescription } = req.body;
    
    if (!userId || !taskName || !taskDescription) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    let userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      userTasks = new UserTasksModel({ userId, tasks: [] });
    }

    // Add the new task to the user’s task list
    userTasks.tasks.push({
      title: taskName,
      description: taskDescription,
      status: 'pending',
    });
    
    await userTasks.save();
    
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "Task created successfully", task: userTasks });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Function to get all tasks for a user
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId)

    if (!userId) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User ID is required" });
    }

    const userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "No tasks found for this user" });
    }

    res.status(STATUS_CODES.OK).json({ tasks: userTasks.tasks });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// Function to update a task for a user
const updateTask = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;
    const { title, description } = req.body;

    if (!userId || !taskId || !title || !description) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    task.title = title;
    task.description = description;
    await userTasks.save();

    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task updated successfully", task });
  } catch (error: any) {
    console.log(error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// Function to delete a task for a user
const deleteTask = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;

    if (!userId || !taskId) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User ID and Task ID are required" });
    }

    // Find the user's tasks
    const userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Find and remove the task
    const taskIndex = userTasks.tasks.findIndex((task:any) => task._id.toString() === taskId);
    if (taskIndex === -1) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    userTasks.tasks.splice(taskIndex, 1); // Remove the task from the array
    await userTasks.save(); // Save the updated userTasks document

    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.log(error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


// Function to get a specific task for a user
const getTask = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;

    if (!userId || !taskId) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User ID and Task ID are required" });
    }

    const userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    res.status(STATUS_CODES.OK).json({ task });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Function to update the status of a task
const updateStatus = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;
    const { status } = req.body;

    if (!userId || !taskId || !status) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User ID, Task ID, and status are required" });
    }

    const userTasks = await UserTasksModel.findOne({ userId });
    if (!userTasks) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    task.status = status;
    await userTasks.save();

    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task status updated successfully", task });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export default { addTask, getTask, getAllTasks, updateTask, deleteTask, updateStatus };
