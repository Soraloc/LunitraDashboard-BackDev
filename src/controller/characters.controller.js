const CharacterModel = require('../model/characters.model');

// Pour la création d'un personnage il faut récupérer l'id de l'utilisateur en ligne
// donc celui qui le créer
// il sera sûrement stocké dans le token
async function createCharacter(req, res) {
  try {
    const character = await CharacterModel.createCharacter(req.body);
    console.log(character);
    res.status(201).json({ // 201 instead of 200, because it's a creation
      success: true,
      message: 'Character created',
      character: character
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all characters
async function getAllCharacters(req, res) {
  try {
    const characters = await CharacterModel.getAllCharacters();
    res.status(200).json({
      success: true,
      message: 'All characters',
      characters: characters
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all characters by user
async function getCharacterByUser(req, res) {
  try {
    const characters = await CharacterModel.getCharacterByUser(req.params.id);
    res.status(200).json({
      success: true,
      message: 'All characters',
      characters: characters
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get character by id
async function getCharacterById(req, res) {
  try {
    const character = await CharacterModel.getCharacterById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Character n°' + req.params.id,
      character: character
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterByUser,
  getCharacterById
}