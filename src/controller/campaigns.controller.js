const CampaignModel = require('../model/campaigns.model');

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new CampaignModel(req.body);
    const savedCampaign = await campaign.save();
    res.status(200).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getAllCampaigns = async (req, res) => {
  try {
    const data = await CampaignModel.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}