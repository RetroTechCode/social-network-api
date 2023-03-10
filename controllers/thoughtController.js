const { User, Thought } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - Thought not found' });
                }
                res.json(data);
            })
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - Thought not found' })
                }
                res.json(data)
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - Thought not found' })
                }
                res.json(data)
            })
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error - Thought not found' })
                }
                res.json(data)
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'Error -  Thought not found' })
                }
                res.json(data)
            })
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController;