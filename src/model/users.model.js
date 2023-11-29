const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // _id: 
    //     mongoose.Schema.Types.ObjectId,
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    campaigns: [{
        required: false,
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Campaigns'
    }],
    characters: [{
        required: false,
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Characters'
    }],
},{ versionKey: false })

module.exports = mongoose.model('Users', dataSchema)