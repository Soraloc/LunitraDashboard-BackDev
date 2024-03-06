const express = require('express');
const AuthenticationController = require('../controller/authentication.controller');
const Token = require('../utils/token');

const router = express.Router();

// Login
router.post('/login', AuthenticationController.loginUser);

// Register
router.post('/register', AuthenticationController.registerUser);

// Verify
router.post('/verify', AuthenticationController.verifyUser);

// Refresh
router.post('/refresh', Token.authenticateToken, Token.refreshToken, AuthenticationController.refreshToken);

module.exports = router;