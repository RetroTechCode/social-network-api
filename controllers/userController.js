const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .then((data) => res.JSON(data))
            .catch((err) => res.status(500).JSON(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((data) => {
            if(!data) {
                res.status(404).JSON({ message: 'Error - User not found' });
            }
            res.JSON(data);
        })
        .catch((err) => res.status(500).JSON(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((data) => res.JSON(data))
        .catch((err) => res.status(500).JSON(err));
    },
    updateUser(req, res) {

    },
    deleteUser(req, res) {

    },
    addFriend(req, res) {

    },
    removeFriend(req, res) {

    }
};

module.exports = userController;