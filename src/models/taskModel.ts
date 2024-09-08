import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default TaskModel;
