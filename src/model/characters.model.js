const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // _id: 
    //     mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Characters', dataSchema)