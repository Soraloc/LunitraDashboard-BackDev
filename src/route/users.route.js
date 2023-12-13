const express = require('express');
//const Model = require('../model/users.model');
const UserController = require('../controller/users.controller');

const router = express.Router();

// Sign in
router.post('/createUser', UserController.createUser);

// Get all users
router.get('/getAll', UserController.getAllUsers);

// Get user by id

// Update user

// Delete user

module.exports = router;