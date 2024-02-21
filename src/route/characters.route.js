const express = require('express');
const CharacterController = require('../controller/characters.controller');

const router = express.Router();

// Create character
router.post('/createCharacter', CharacterController.createCharacter);

// Get all characters
router.get('/getAll', CharacterController.getAllCharacters);

// Get character by user
router.get('/getByUser/:id', CharacterController.getCharacterByUser);

// Get character by id
router.get('/getById/:id', CharacterController.getCharacterById);

module.exports = router;