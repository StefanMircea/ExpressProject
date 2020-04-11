const express = require('express');

const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.get("/", userController.getAll);

userRouter.get("/:id",userController.getByID);

userRouter.post("/", userController.add);

userRouter.put("/:id", userController.edit);

userRouter.delete("/:id", userController.delete);

module.exports = userRouter;