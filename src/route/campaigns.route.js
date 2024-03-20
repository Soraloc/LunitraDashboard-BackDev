const express = require('express');
const CampaignController = require('../controller/campaigns.controller');
const LocationController = require('../controller/locations.controller');

const router = express.Router();

// Create campaign
router.post('/createCampaign', CampaignController.createCampaign);

// Get all campaigns
router.get('/getAll', CampaignController.getAllCampaigns);

// Get campaign by id user
router.get('/getByUser/:id', CampaignController.getCampaignsByUser);

// Get campaign by id campaign
router.get('/getCampaign/:id', CampaignController.getCampaignById);

// Update campaign
// router.put('/updateCampaign/:id', CampaignController.updateCampaign);

// Delete campaign

// Create location in campaign
router.all('/createLocation/:id', CampaignController.campaignExists, LocationController.createLocation, CampaignController.addLocationToCampaign);
router.get('/getLocations/:id', CampaignController.getLocationsFromCampaign);

module.exports = router;