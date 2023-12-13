const mongoose = require('mongoose');

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

async function createCampaign(body) {
  const campaign = new Campaign(body);
  const savedCampaign = await campaign.save();
  return savedCampaign;
}

module.exports = {
  createCampaign
};