const mongoose = require('mongoose');
const CampaignObject = require('../class/campaign.class');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users'
  },
  game_master: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users'
  },
  created_at: {
    required: true,
    type: Date,
    default: Date.now
  },
  image: {
    required: false,
    type: String
  },
  locations: [{
    required: false,
    type: String
  }],
  characters: [{
    required: false,
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'Characters'
  }],
},{ versionKey: false })

const Campaign = mongoose.model('Campaigns', dataSchema);

async function createCampaign(req) {
  const campaign = new Campaign(req);
  const savedCampaign = await campaign.save();
  const campaignObject = new CampaignObject(savedCampaign._id, savedCampaign.name, savedCampaign.creator, savedCampaign.game_master, savedCampaign.created_at, savedCampaign.image);
  return campaignObject;
}

async function getAllCampaigns() {
  const campaigns = await Campaign.find();
  const campaignsObject = campaigns.map((campaign) => new CampaignObject(campaign._id, campaign.name, campaign.creator, campaign.game_master, campaign.created_at, campaign.image));
  return campaignsObject;
}

// Get single campaign by its ID
async function getCampaignById(id) {
  const campaigns = await Campaign.findById(id);
  const campaignObject = campaigns.map((campaign) => new CampaignObject(campaign._id, campaign.name, campaign.creator, campaign.game_master, campaign.created_at, campaign.image));
  return campaignObject;
}

// Get all campaigns by user ID
async function getCampaignByUser(id) {
  const campaigns = await Campaign.find({creator: id});
  const campaignObject = campaigns.map((campaign) => new CampaignObject(campaign._id, campaign.name, campaign.creator, campaign.game_master, campaign.created_at, campaign.image));
  return campaignObject;
}

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignByUser
}