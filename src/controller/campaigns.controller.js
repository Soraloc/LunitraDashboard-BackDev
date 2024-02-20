const CampaignModel = require('../model/campaigns.model');

// Create a new campaign
async function createCampaign(req, res) {
  try {
    console.log(req.body);
    campaign = await CampaignModel.createCampaign(req.body);
    res.status(200).json({
      status: true,
      message: "Campaign created",
      campaign: campaign
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all campaigns from the database
async function getAllCampaigns(req, res) {
  try {
    const campaigns = await CampaignModel.getAllCampaigns();
    res.status(200).json({
      status: true,
      message: "All campaigns",
      campaigns: campaigns
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single campaign by its ID
async function getCampaignById(req, res) {
  try {
    const campaign = await CampaignModel.getCampaignById(req.params.id);
    res.status(200).json({
      status: true,
      message: "Campaign n°" + req.params.id,
      campaign: campaign
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all campaigns by user
async function getCampaignByUser(req, res) {
  try {
    const campaigns = await CampaignModel.getCampaignByUser(req.params.id);
    res.status(200).json({
      status: true,
      message: "All campaigns",
      campaigns: campaigns
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignByUser
}