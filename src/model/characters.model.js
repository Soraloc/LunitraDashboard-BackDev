const mongoose = require('mongoose');
const CharacterObject = require('../class/character.class');

const dataSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String
  },
  last_name: {
    required: false,
    type: String
  },
  age: {
    required: true,
    type: Number
  },
  gender: {
    required: false,
    type: String
  },
  physical_description: {
    required: false,
    type: String
  },
  mental_description: {
    required: false,
    type: String
  },
  background: {
    required: false,
    type: String
  },
  image: {
    required: false,
    type: String
  },
  gallery: {
    required: false,
    type: [String]
  },
  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users'
  },
  campaigns: [{
    required: false,
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'Campaigns'
  }],
},{ versionKey: false })

const Character = mongoose.model('Characters', dataSchema);

// Create a new character
async function createCharacter(req) {
  const character = new Character(req);
  const savedCharacter = await character.save();
  const characterObject = new CharacterObject(savedCharacter);
  return characterObject;
}

// Get all characters
async function getAllCharacters() {
  const characters = await Character.find();
  const charactersObject = characters.map((character) => new CharacterObject(character));
  return charactersObject;
}

// Get all characters by user
async function getCharactersByUser(id) {
  const characters = await Character.find({creator: id});
  const charactersObject = characters.map((character) => new CharacterObject(character));
  return charactersObject;
}

// Get character by id
async function getCharacterById(id) {
  const character = await Character.findById(id);
  const characterObject = new CharacterObject(character);
  return characterObject;
}

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharactersByUser,
  getCharacterById
}