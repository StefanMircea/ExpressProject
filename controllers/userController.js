const userModel = require("../models/userModel");

const userController = {
    getAll: function (req, res) {
        let users = userModel.getAllUsers();

        res.status(200).json(users);
    },

    getByID: function (req, res) {
        let user = userModel.getUserByID(req.params.id);

        res.status(200).json(user);
    },

    add: function (req, res) {
        let addedUser = userModel.addUser(req.body);

        res.status(201).json(addedUser);
    },

    edit: function (req, res) {
        let editedUser = userModel.editUser(Number(req.params.id), req.body);

        res.status(201).json(editedUser);
    },

    delete: function(req, res) {
        let deletedUser = userModel.deleteUser(Number(req.params.id));

        res.status(201).json(deletedUser);
    }
}

module.exports = userController;