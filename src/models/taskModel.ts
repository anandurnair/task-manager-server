import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const userTasksSchema = new Schema({
  userId: { type: String, required: true },
  tasks: [taskSchema], 
});

const TaskModel = mongoose.models.tasks || mongoose.model("tasks", userTasksSchema);
export default TaskModel;
