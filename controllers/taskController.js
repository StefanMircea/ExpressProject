const taskModel = require("../models/taskModel");

const taskController = {
    getAll: function (req, res) {
        let tasks = [];
        if (req.query.creator)
            tasks = taskModel.getAllCreatedTasksOfID(req.query.creator);
        else
            if (req.query.assigned)
                tasks = taskModel.getAllAssignedTasksOfID(req.query.assigned);
            else
                if (req.query.user)
                    tasks = taskModel.getAllTasksOfID(req.query.user);
                else
                    tasks = taskModel.getAllTasks();
        res.status(200).json(tasks);
    },

    getById: function (req, res) {
        let task = taskModel.getTaskByID(req.params.id);2

        res.status(200).json(task);
    },

    add: function (req, res) {
        let addedTask = taskModel.addTask(req.body);

        res.status(201).json(addedTask);
    },

    edit: function (req, res) {
        let editedTask = taskModel.editTask(Number(req.params.id), req.body);

        res.status(201).json(editedTask);
    },

    delete: function (req, res) {
        let deletedTask = taskModel.deleteTask(Number(req.params.id));

        res.status(201).json(deletedTask);
    }
}

module.exports = taskController;