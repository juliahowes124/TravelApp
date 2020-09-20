const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post('/register', 
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(),
        check('username').not().isEmpty(),
        check('password').isLength({min: 6})
    ], usersController.register);
router.post('/login', usersController.login);
router.patch('/:uid', 
    [
        check('name').not().isEmpty(),
        check('username').not().isEmpty()
    ], usersController.updateUser);

module.exports = router;