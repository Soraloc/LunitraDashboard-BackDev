const CampaignModel = require('../model/campaigns.model');

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

module.exports = {
  createCampaign,
  getAllCampaigns
}