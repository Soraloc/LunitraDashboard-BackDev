const CampaignModel = require('../model/campaigns.model');
const CampaignClass = require('../class/campaign.class');

exports.createCampaign = async (req, res) => {
  try {
    campaign = await CampaignModel.createCampaign(req.body);
    //créer l'objet campagne
    campaignObject = new CampaignClass(campaign._id, campaign.name, campaign.creator, campaign.game_master, campaign.created_at, campaign.image, campaign.locations);
    res.status(200).json(campaign);
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