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
  const characterObject = new CharacterObject(savedCharacter._id, savedCharacter.first_name, savedCharacter.last_name, savedCharacter.age, savedCharacter.gender, savedCharacter.creator);
  return characterObject;
}

// Get all characters
async function getAllCharacters() {
  const characters = await Character.find();
  const charactersObject = characters.map((character) => new CharacterObject(character._id, character.first_name, character.last_name, character.age, character.gender, character.creator));
  return charactersObject;
}

// Get all characters by user
async function getCharacterByUser(id) {
  const characters = await Character.find({creator: id});
  const charactersObject = characters.map((character) => new CharacterObject(character._id, character.first_name, character.last_name, character.age, character.gender, character.creator));
  return charactersObject;
}

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterByUser
}