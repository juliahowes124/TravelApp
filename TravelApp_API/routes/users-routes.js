const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post('/register', 
    [
        check('name').not().isEmpty(),
        check('username').not().isEmpty(),
        check('password').not().isEmpty()
    ], usersController.register);
router.post('/login', usersController.login);
router.patch('/:uid', 
    [
        check('name').not().isEmpty(),
        check('username').not().isEmpty()
    ], usersController.updateUser);

module.exports = router;