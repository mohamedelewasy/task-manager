const taskModel = require("../models/task");
const wrap = require("express-async-wrapper");

const customNoTaskError = (id) => {
  let error = new Error(`No task found`);
  error.status = 404;
  error.message = `No task found with id: ${id}`;
  return error;
};

const getAllTasks = wrap(async (req, res, next) => {
  let tasks = await taskModel.find({}, "name completed");
  return res.status(200).json({ tasks });
});

const createNewTask = wrap(async (req, res, next) => {
  let task = await taskModel.create({
    name: req.body.name,
    completed: req.body.completed,
  });
  return res.status(201).json({ task });
});

const getSingleTask = wrap(async (req, res, next) => {
  let task = await taskModel.findOne({ _id: req.params.ID });
  if (!task) next(customNoTaskError(req.params.ID));
  return res.status(200).json({ task });
});

const updateTask = wrap(async (req, res, next) => {
  let task = await taskModel.findOneAndUpdate(
    { _id: req.params.ID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) next(customNoTaskError(req.params.ID));
  res.status(200).json({ task });
});

const deleteTask = wrap(async (req, res, next) => {
  let task = await taskModel.findOneAndDelete({ _id: req.params.ID });
  if (!task) next(customNoTaskError(req.params.ID));
  return res.status(200).json({ msg: "Task deleted" });
});

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
