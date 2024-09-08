import { Request, Response } from "express";
import TaskModel from "../models/taskModel";
import { STATUS_CODES } from "../utils/constants";
const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, taskDescription } = req.body;
    console.log(req.body);
    
    if (!taskName || !taskDescription) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const newTask = new TaskModel({ title : taskName, description : taskDescription });
    await newTask.save();
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    res.status(STATUS_CODES.OK).json({ tasks });
  } catch (error) {
    console.log(error);
    
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    console.log('Working', req.body);
    
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description ) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error: any) {
    console.log(error);
    
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    console.log('Delete working' ,req.params);
    
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    res.status(STATUS_CODES.OK).json({ task });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res
      .status(STATUS_CODES.OK)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error: any) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
export default { addTask, getTask, getAllTasks, updateTask, deleteTask ,updateStatus};
