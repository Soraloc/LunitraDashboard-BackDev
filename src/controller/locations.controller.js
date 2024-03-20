// Import LocationModel
const LocationModel = require('../model/locations.model');
const CampaignModel = require('../model/campaigns.model');

// Create location within a campaign
async function createLocation(req, res, next) {
  try {
    // Get the campaign from the request
    console.log("Test before getting the campaign :" + req.campaign.id);
    const campaign = req.campaign;

    console.log("Test before locationData :" + campaign.id);
    // Create location associated with the campaign
    const locationData = {
      // Assuming the location data is passed in the request body
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      gallery: req.body.gallery
    };

    const location = await LocationModel.createLocation(locationData);
    console.log('Location created:', location);

    // Update the campaign to include the location ID
    campaign.locations.push(location._id);
    req.campaign = campaign;
    req.location = location;

    console.log('Location ID before next:', location._id);
    console.log('Campaign ID before next:', campaign.id);
    next();
  } catch(error) {
    next(error);
  }
}

async function getAllLocations(req, res) {
  try {
    const locations = await LocationModel.getAllLocations();
    res.status(200).json({
      success: true,
      message: 'All locations',
      locations: locations
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

async function getLocationById(req, res) {
  try {
    const location = await LocationModel.getLocationById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Location n°" + req.params.id,
      location: location
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById
}