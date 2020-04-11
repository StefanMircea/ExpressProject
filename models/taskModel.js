const userModel = require("../models/userModel");

const taskModel = {
    tasks: require("../tasksData").tasks,

    getAllTasks: function () {
        return this.tasks;
    },

    getTaskByID: function (id) {
        let tasksFound = this.tasks.filter(currentTask => currentTask.id == id);
        if (tasksFound.length >= 1)
            return tasksFound[0];
        else
            return null;
    },

    addTask: function (task) {
        if (!task.taskName || (!task.creatorID && task.creatorID !== 0)) {
            throw new Error("Name and creatorID are required.");
        }

        if (userModel.users.findIndex(currentUser => currentUser.id == task.creatorID) == -1) {
            throw new Error("Creator doesn't exist.")
        }
        if (task.assignedID || task.assignedID === 0) {
            if (userModel.users.findIndex(currentUser => currentUser.id == task.assignedID) == -1) {
                throw new Error("Assigned doesn't exist.")
            }
        }

        let taskToAdd = {
            id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 0,
            taskName: task.taskName,
            description: task.description ? task.description : "",
            done: task.done,
            deadline: task.deadline ? task.deadline : "",
            creator: userModel.getUserByID(Number(task.creatorID)).name,
            assigned: (task.assignedID || task.assignedID === 0) ? userModel.getUserByID(Number(task.assignedID)).name : undefined,
            creatorID: task.creatorID,
            assignedID: (task.assignedID || task.assignedID === 0) ? task.assignedID : undefined
        }

        this.tasks.push(taskToAdd);

        return this.getTaskByID(taskToAdd.id);
    },

    editTask: function (id, task) {
        let indexOfTaskToModify = this.tasks.findIndex(
            currentTask => currentTask.id == id
        );

        if (indexOfTaskToModify == -1)
            throw new ERROR("Task doesn't exist.");

        if (task.assignedID || task.assignedID === 0) {
            if (userModel.users.findIndex(currentUser => currentUser.id == task.creatorID) == -1) {
                throw new Error("Creator doesn't exist.")
            }
        }

        if (task.assignedID || task.assignedID === 0) {
            if (userModel.users.findIndex(currentUser => currentUser.id == task.assignedID) == -1) {
                throw new Error("Assigned doesn't exist.")
            }
        }

        let originalTask = this.tasks[indexOfTaskToModify];

        let editedTask = {
            id: originalTask.id,
            taskName: task.taskName ? task.taskName : originalTask.taskName,
            description: task.description ? task.description : originalTask.description,
            done: task.done === true ? task.done : task.done === false ? task.done : originalTask.done,
            deadline: task.deadline ? task.deadline : originalTask.deadline,
            creator: (task.creatorID || task.creatorID === 0) ? userModel.getUserByID(Number(task.creatorID)).name : originalTask.creator,
            assigned: (task.assignedID || task.assignedID === 0) ? userModel.getUserByID(Number(task.assignedID)).name : originalTask.assigned,
            creatorID: (task.creatorID || task.creatorID === 0) ? task.creatorID : originalTask.creatorID,
            assignedID: (task.assignedID || task.assignedID === 0) ? task.assignedID : originalTask.assignedID
        }

        this.tasks[indexOfTaskToModify] = editedTask;

        return this.getTaskByID(id);
    },

    deleteTask: function (id) {
        let indexOfTaskToDelete = this.tasks.findIndex(
            currentTask => currentTask.id == id
        );

        if (indexOfTaskToDelete == -1)
            throw new Error("Task doesn't exist.");

        return this.tasks.splice(indexOfTaskToDelete, 1)[0];
    },

    getAllCreatedTasksOfID: function (id) {
        let TasksToReturn = this.tasks.filter(currentTask => currentTask.creatorID == id);

        if (TasksToReturn == -1) {
            throw new Error("Task doesn't exist.");
        }

        return TasksToReturn;
    },

    getAllAssignedTasksOfID: function (id) {
        let TasksToReturn = this.tasks.filter(currentTask => currentTask.assignedID == id);

        if (TasksToReturn == -1) {
            throw new Error("Task doesn't exist.");
        }

        return TasksToReturn;
    },

    getAllTasksOfID: function (id) {
        let TasksToReturn = this.getAllCreatedTasksOfID(id).concat(this.getAllAssignedTasksOfID(id));
        let TaskToReturnNoDuplicatesSet = new Set(TasksToReturn);
        let TaskToReturnNoDuplicatesArray = [...TaskToReturnNoDuplicatesSet];

        // let TasksToReturnNoDuplicatesArray = TasksToReturn.filter((currentTask, index) => TasksToReturn.indexOf(currentCurrentTask => currentCurrentTask.id == currentTask.id) == index);
        return TaskToReturnNoDuplicatesArray;
    }
}

module.exports = taskModel;