const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { isValidObjectId } = require('mongoose');

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

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again',
            500
        );
        return next(error);
    }
    

    const createdUser = new User({
        name,
        username,
        image: req.file.path,
        password: hashedPassword,
        posts: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Registration failed', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({userId: createdUser.id, username: createdUser.username}, 'supersecret_dont_share', {expiresIn: '1h'});
    } catch (err) {
        const error = new HttpError('Registration failed', 500);
        return next(error);
    }
    

    res.status(201).json({userId: createdUser.id, username: createdUser.username, token: token});
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


    if (!existingUser) {
        const error = new HttpError('Invalid credentials, could not login', 401);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in. Check credentials and try again', 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials, could not login', 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({userId: existingUser.id, username: existingUser.username}, 'supersecret_dont_share', {expiresIn: '1h'});
    } catch (err) {
        const error = new HttpError('Login failed', 500);
        return next(error);
    }
    
    res.json({userId: existingUser.id, username: existingUser.username, token: token});
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('hello3');
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