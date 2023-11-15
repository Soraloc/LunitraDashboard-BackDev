const express = require('express');
const Model = require('../model/users.model');
const UserController = require('../controller/users.controller');

const router = express.Router();

//Post Method
router.post('/createUser', UserController.createUser);

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API');
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API');
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API');
})

module.exports = router;