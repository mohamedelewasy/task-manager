const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/tasks");

router
  .route("/")
  .get(taskControllers.getAllTasks)
  .post(taskControllers.createNewTask);

router
  .route("/:ID")
  .get(taskControllers.getSingleTask)
  .patch(taskControllers.updateTask)
  .delete(taskControllers.deleteTask);

module.exports = router;
