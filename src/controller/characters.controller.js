const CharacterModel = require('../model/characters.model');

// Pour la création d'un personnage il faut récupérer l'id de l'utilisateur en ligne
// donc celui qui le créer
// il sera sûrement stocké dans le token
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

exports.getCharacterByUser = async (req, res) => {
  try {
    const data = await CharacterModel.find({creator: req.params.id});
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}