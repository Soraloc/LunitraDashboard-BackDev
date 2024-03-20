const CampaignModel = require('../model/campaigns.model');

// Create a new campaign
async function createCampaign(req, res) {
  try {
    console.log(req.body);
    campaign = await CampaignModel.createCampaign(req.body);
    res.status(201).json({ // 201: Created
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
    res.status(200).json({ // 200: OK
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

/* EXAMPLE OF A MIDDLEWARE FUNCTION
// Get a single campaign by its ID
async function getCampaignById(req, res, next) {
  try {
    const campaign = await CampaignModel.getCampaignById(req.params.id);
    res.status(200).json({
      status: true,
      message: "Campaign n°" + req.params.id,
      campaign: campaign
    });
    next();
  }
  catch(error) {
    next(error);
  }
} */

// Get all campaigns by user
async function getCampaignsByUser(req, res) {
  try {
    const campaigns = await CampaignModel.getCampaignsByUser(req.params.id);
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

// Update campaign
async function updateCampaign(req, res) {
  try {
    console.log("Update campaign req location object: ", req.campaign);
    const campaign = req.campaign;

    const updatedCampaign = await CampaignModel.updateCampaign(campaign);

    res.status(200).json({
      status: true,
      message: "Campaign updated",
      campaign: updatedCampaign
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Middleware function to ensure that the campaign exists
async function campaignExists(req, res, next) {
  const campaignId = req.params.id;
  try {
    const campaign = await CampaignModel.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    // If the campaign exists, set it in the req obj for later
    req.campaign = campaign;
    console.log("Test before next: " + JSON.stringify(campaign));
    next();
  } catch (error) {
    next(error);
  }
}

// Add location to campaign
async function addLocationToCampaign(req, res) {
  try {
    const campaign = req.campaign;
    const locationId = req.location.id;
    console.log("Campaign before adding location to campaign: " + JSON.stringify(campaign));
    console.log("Location ID before adding location to campaign: " + locationId);
    const updatedCampaign = await CampaignModel.addLocationToCampaign(campaign.id, locationId);
    res.status(200).json({
      status: true,
      message: "Location n°" + locationId + " added to campaign " + campaign.name + " successfully",
      campaign: updatedCampaign
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all locations from a specific campaign
async function getLocationsFromCampaign(req, res) {
  try {
    const locations = await CampaignModel.getLocationsFromCampaign(req.params.id);
    res.status(200).json({
      status: true,
      message: "Locations from campaign n°" + req.params.id,
      locations: locations
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
  getCampaignsByUser,
  updateCampaign,
  addLocationToCampaign,
  campaignExists,
  getLocationsFromCampaign
}