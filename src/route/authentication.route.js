const express = require('express');
const AuthenticationController = require('../controller/authentication.controller');

const router = express.Router();

// Login
router.post('/login', AuthenticationController.loginUser);

// Register
router.post('/register', AuthenticationController.registerUser);

// Verify
router.post('/verify', AuthenticationController.verifyUser);

module.exports = router;