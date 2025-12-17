const service = require("./task.service");

exports.create = async (req, res) => {
  const task = await service.createTask({
    ...req.body,
    creatorId: req.user.id,
  });
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const task = await service.updateTask(req.params.id, req.body);
  res.json(task);
};

exports.list = async (req, res) => {
  const tasks = await service.getAllTasks();
  res.json(tasks);
};
