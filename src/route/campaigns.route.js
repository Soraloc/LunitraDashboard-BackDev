const express = require('express');
const CampaignController = require('../controller/campaigns.controller');

const router = express.Router();

// Create campaign
router.post('/createCampaign', CampaignController.createCampaign);

// Get all campaigns
router.get('/getAll', CampaignController.getAllCampaigns);

// Get campaign by id user

// Get campaign by id campaign

// Update campaign

// Delete campaign

module.exports = router;