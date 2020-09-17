const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Julia',
        username: 'julia123',
        email: 'test@test.com',
        password: 'password'
    }
]
const getUsers = (req, res, next) => {
    const users = DUMMY_USERS;
    res.json({users});
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

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not authenticate user', 401);
    }
    res.json({message: 'Logged In'});
};

const updateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const userId = req.params.uid;
    const userForUpdate = { ...DUMMY_USERS.find(u => u.id === userId)};
    const userIndex = DUMMY_USERS.findIndex(u => u.id === userId);
    const { name, username, email} = req.body;
    userForUpdate.name = name;
    userForUpdate.username = username;
    userForUpdate.email = email;

    DUMMY_USERS[userIndex] = userForUpdate;
    res.status(200).json({user: userForUpdate});
}

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
exports.updateUser = updateUser;