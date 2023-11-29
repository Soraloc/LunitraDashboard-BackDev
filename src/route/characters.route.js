const express = require('express');
//const Model = require('../model/users.model');
const CharacterController = require('../controller/characters.controller');

const router = express.Router();

//Post Method
router.post('/createCharacter', CharacterController.createCharacter);

//Get all Method
router.get('/getAll', CharacterController.getAllCharacters);

module.exports = router;