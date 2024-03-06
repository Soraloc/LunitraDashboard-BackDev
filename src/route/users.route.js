const express = require('express');
const UserController = require('../controller/users.controller');
const Token = require('../utils/token');

const router = express.Router();

// Get all users
router.get('/getAll', Token.authenticateToken, Token.refreshToken, UserController.getAllUsers);

// Get user by id
router.get('/getById/:id', UserController.getUserById);

// Update user


// Delete user

module.exports = router;