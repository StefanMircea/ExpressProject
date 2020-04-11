const express = require('express');
const app = express();

app.use(express.json());

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.listen(4000);