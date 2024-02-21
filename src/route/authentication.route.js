const express = require('express');
const AuthenticationController = require('../controller/authentication.controller');

const router = express.Router();

// Login
router.post('/login', AuthenticationController.loginUser);

// Register
router.post('/register', AuthenticationController.registerUser);

// Verify
router.post('/verify/:token', AuthenticationController.verifyUser);

// Reset password
//router.post('/resetPassword', AuthenticationController.resetPassword);

// Change password
router.post('/changePassword', AuthenticationController.changePassword);

module.exports = router;