const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    locations: [{
        required: false,
        type: String
    }],
    characters: [{
        required: false,
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Characters'
    }],
},{ versionKey: false })

module.exports = mongoose.model('Campaigns', dataSchema)