const mongoose = require('mongoose');
const UserObject = require('../class/user.class');
const Token = require('../utils/token');

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
    creationDate: {
        required: true,
        type: Date,
        default: Date.now
    },
    verified: {
        required: true,
        type: Boolean,
        default: false
    },
    verifyToken: {
        required: false,
				unique: true,
        type: String
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
  const tokenType = "VERIFY";
  const verifyToken = Token.generateToken(user, tokenType)
  user.verifyToken = verifyToken;
  const savedUser = await user.save();
  const userObject = new UserObject(savedUser);
  return userObject;
}

// Get all users
async function getAllUsers() {
	const users = await User.find();
	const usersObject = users.map((user) => new UserObject(user));
	return usersObject;
}

// Get user by email
async function getUserByEmail(email) {
	const user = await User.find({ email: email });
	if(!user) {
		return null;
	} else {
		const userObject = new UserObject(user);
		return userObject;
	}
}

async function getUserByVerifyToken(verifyToken) {
	const user = await User.find({ verifyToken: verifyToken });
	if(!user) {
		return null;
	} else {
		const userObject = new UserObject(user);
		return userObject;
	}
}

async function deleteVerifyToken(user) {
	user.verifyToken = null;
	user.verified = true;
	const savedUser = await user.save();
	const userObject = new UserObject(savedUser);
	return userObject;
}

async function getUserById(id) {
    const user = await User.findById(id);
    if(!user) {
        return null;
    } else {
        const userObject = new UserObject(user);
        return userObject;
    }
}

module.exports = {
  createUser,
	getAllUsers,
	getUserByEmail,
	getUserByVerifyToken,
	deleteVerifyToken,
    getUserById
};