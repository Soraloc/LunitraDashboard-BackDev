const CharacterModel = require('../model/characters.model');

exports.createCharacter = async (req, res) => {
  try {
    const character = new CharacterModel(req.body);
    const savedCharacter= await character.save();
    res.status(200).json(savedCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getAllCharacters = async (req, res) => {
  try {
    const data = await CharacterModel.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}