const repo = require("./task.repository");
const { getIO } = require("../../config/socket");

const createTask = async (data) => {
  const task = await repo.createTask(data);
  const io = getIO();

  io.to(task.assignedToId.toString()).emit("taskAssigned", task);
  io.emit("taskCreated", task);

  return task;
};

const updateTask = async (id, data) => {
  const task = await repo.updateTask(id, data);

  const io = getIO();
  io.emit("taskUpdated", task);

  return task;
};

const getAllTasks = () => repo.getTasks();

module.exports = { createTask, updateTask, getAllTasks };
