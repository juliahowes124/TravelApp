const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

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
const register = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { name, username, email, password } = req.body;
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Email already exists', 422);
    }
    const createdUser = {
        id: uuid(),
        name,
        username,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
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