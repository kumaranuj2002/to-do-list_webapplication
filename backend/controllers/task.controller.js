const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
};

// Create task
exports.createTask = async (req, res) => {
  const newTask = await Task.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(newTask);
};

// Update task
exports.updateTask = async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Task not found" });

  res.json(updated);
};

// Delete task
exports.deleteTask = async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!deleted) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted" });
};
