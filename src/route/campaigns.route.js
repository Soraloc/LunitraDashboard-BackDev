const express = require('express');
const CampaignController = require('../controller/campaigns.controller');

const router = express.Router();

// Create campaign
router.post('/createCampaign', CampaignController.createCampaign);

// Get all campaigns
router.get('/getAll', CampaignController.getAllCampaigns);

// Get campaign by id user
router.get('/getByUser/:id', CampaignController.getCampaignByUser);

// Get campaign by id campaign
router.get('/getCampaign/:id', CampaignController.getCampaignById);

// Update campaign

// Delete campaign

module.exports = router;