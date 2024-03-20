const express = require('express');
const LocationController = require('../controller/locations.controller');

const router = express.Router();

// Get all routes
router.get('/getAll', LocationController.getAllLocations);
router.get('/getLocation/:id', LocationController.getLocationById);

module.exports = router;