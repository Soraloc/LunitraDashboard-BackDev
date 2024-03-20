const mongoose = require('mongoose');
const LocationObject = require('../class/location.class');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
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
  gallery: [{
    required: false,
    type: String
  }],
},{ versionKey: false })

const Location = mongoose.model('Locations', dataSchema);

// Create a location
async function createLocation(locationData) {
  const location = new Location(locationData);
  const savedLocation = await location.save();
  return savedLocation;
}

// Get all the locations from a specific campaign
async function getAllLocations() {
  const locations = await Location.find();
  const locationsObject = locations.map((location) => new LocationObject(location._id, location.name, location.description, location.created_at, location.image, location.gallery));
  return locationsObject;
}

// Get location by ID
async function getLocationById(id) {
  const location = await Location.findById(id);
  const locationObject = new LocationObject(location._id, location.name, location.description, location.created_at, location.image, location.gallery);
  return locationObject;
}

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById
};