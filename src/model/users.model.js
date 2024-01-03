const mongoose = require('mongoose');
const UserObject = require('../class/user.class');

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
    role: {
        required: true,
        type: String,
        default: "Member"
    },
    verified: {
        required: true,
        type: Boolean,
        default: false
    },
    creationDate: {
        required: true,
        type: Date,
        default: Date.now
    },
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

const User = mongoose.model('Users', dataSchema);

// Create a new user when sign in
async function createUser(req) {
  const user = new User(req);
  const savedUser = await user.save();
  const userObject = new UserObject(savedUser);
  return userObject;
}

module.exports = {
  createUser
};