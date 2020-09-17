const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch(err) {
        const error = new HttpError('Could not fetch users', 500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true}))});
};
const register = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422)); 
    }

    const { name, username, password } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        const error = new HttpError('Registering failed, please try again later', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User already exists, please login instead.', 422);
    }

    const createdUser = new User({
        name,
        username,
        image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        password,
        posts: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Registration failed', 500);
        return next(error);
    }

    res.status(201).json({user: createdUser.toObject({ getters: true })});
}

const login = async (req, res, next) => {
    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username })
    } catch (err) {
        const error = new HttpError('Login failed, please try again later', 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials, could not login', 401);
        return next(error);
    }

    res.json({message: 'Logged In'});
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not fetch user from database.', 500);
        return next(error);
    }

    const { name, username } = req.body;
    user.name = name;
    user.username = username;

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not update user.');
        return next(error);
    }

    res.status(200).json({user: user.toObject({ getters: true })});
}

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
exports.updateUser = updateUser;