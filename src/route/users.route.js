const express = require('express');
//const Model = require('../model/users.model');
const UserController = require('../controller/users.controller');

const router = express.Router();

// Get all users
router.get('/getAll', UserController.getAllUsers);

// Get user by id
router.get('/getById/:id', UserController.getUserById);

// Update user


// Delete user

module.exports = router;