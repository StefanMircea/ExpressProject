const express = require('express');

const taskRouter = express.Router();

const taskController = require("../controllers/taskController");

taskRouter.get("/",taskController.getAll);

taskRouter.get("/:id",taskController.getById);

taskRouter.post("/",taskController.add);

taskRouter.put("/:id", taskController.edit);

taskRouter.delete("/:id",taskController.delete);

module.exports = taskRouter;