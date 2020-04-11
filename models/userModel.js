const userModel = {
    users: require("../usersData.js").users,

    getAllUsers: function () {
        return this.users;
    },

    getUserByID: function (id) {
        let usersFound = this.users.filter(currentUser => currentUser.id == id);
        if (usersFound.length >= 1)
            return usersFound[0];
        else
            return null;
    },

    addUser: function (user) {
        if (!user.name || !user.email || !user.password) {
            throw new Error("All fields are required.");
        }

        if (this.users.find(currentUser => currentUser.email == user.email)) {
            throw new Error("This email is already beeing used.");
        }

        let userToAdd = {
            id: this.users.length ? this.users[this.users.length - 1].id + 1 : 0,
            name: user.name,
            email: user.email,
            password: user.password
        }

        this.users.push(userToAdd);

        return this.getUserByID(userToAdd.id);
    },

    editUser: function (id, user) {
        let indexUserToModify = this.users.findIndex(
            currentUser => currentUser.id == id
        );

        if (indexUserToModify == -1) {
            throw new error("User doesn't exist.");
        }

        if (this.users.find(currentUser => currentUser.email == user.email)) {
            throw new Error("This email is already beeing used.");
        }

        let originalUser = this.users[indexUserToModify];

        let editedUser = {
            id: originalUser.id,
            name: user.name ? user.name : originalUser.name,
            email: user.email ? user.email : originalUser.email,
            password: user.password ? user.password : originalUser.password
        }

        this.users[indexUserToModify] = editedUser;

        return this.getUserByID(id);
    },

    deleteUser(id) {
        let indexOfUserToDelete = this.users.findIndex(
            currentUser => currentUser.id == id
        );

        if(indexOfUserToDelete == -1) {
            throw new Error("This user doesn't exist.");
        }

        return this.users.splice(indexOfUserToDelete, 1)[0];
    }
}

module.exports = userModel;