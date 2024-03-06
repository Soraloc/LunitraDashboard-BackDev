const express = require('express');
const AuthenticationController = require('../controller/authentication.controller');
const Token = require('../utils/token');

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

// Refresh test
// utiliser authenticateToken et refreshToken sur toutes les routes après la connexion
router.post('/refresh', Token.authenticateToken, Token.refreshToken, AuthenticationController.testRefreshToken);

module.exports = router;