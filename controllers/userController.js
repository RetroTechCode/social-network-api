const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - User not found' });
                }
                res.json(data);
            })
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ id_: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - User not found' })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - User not found' })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - User not found' })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - User not found' })
                }
            })
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;