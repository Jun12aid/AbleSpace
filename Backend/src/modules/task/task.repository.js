const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 100 },
    description: String,
    dueDate: Date,
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"],
    },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedToId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

const createTask = (data) => Task.create(data);
const getTasks = () => Task.find().populate("assignedToId", "name");
const updateTask = (id, data) =>
Task.findByIdAndUpdate(id, data, { new: true });

module.exports = { createTask, getTasks, updateTask };
