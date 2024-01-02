const express = require('express');
const AuthenticationController = require('../controller/authentication.controller');

const router = express.Router();

// Login
router.post('/login', AuthenticationController.loginUser);

// Register
router.post('/register', AuthenticationController.registerUser);

// User verification
router.post('/verification', AuthenticationController.verificationUser);

module.exports = router;