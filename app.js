const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.model');

const app = express();

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const newUser = await User.create({ username, password });
        delete newUser.password;
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username, password }, { password: 0 });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching users', error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user by ID', error: error.message });
    }
});

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Invalid route." })
})

module.exports = app;