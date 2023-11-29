const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    _id: 
        mongoose.Schema.Types.ObjectId,
    last_name: {
        required: true,
        type: String
    },
    first_name: {
        required: true,
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
})

module.exports = mongoose.model('Characters', dataSchema)