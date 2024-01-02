const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: [{
        required: true,
        type: Boolean,
        default: "Member"
    }],
    verified: [{
        required: true,
        type: Boolean,
        default: false
    }],
    creationDate: [{
        required: true,
        type: Date,
        default: Date.now
    }],
    campaigns: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaigns'
    }],
    characters: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Characters'
    }],
},{ versionKey: false })

module.exports = mongoose.model('Users', dataSchema)

exports.createUser = async(usernameValue, emailValue, passwordValue) => {
    try {
        const user = new UserModel(
            {username: usernameValue},
            {email: emailValue},
            {password: passwordValue},
        );
        savedUser = await user.save();
        res.status(200).json(savedUser);
    }
    catch(error) {
        res.status(400).json({ error: error.message });
    }
}