const express = require('express');
//const Model = require('../model/users.model');
const CampaignController = require('../controller/campaigns.controller');

const router = express.Router();

//Post Method
router.post('/createCampaign', CampaignController.createCampaign);

//Get all Method
router.get('/getAll', CampaignController.getAllCampaigns);

module.exports = router;