const mongoose = require('mongoose');
const UserObject = require('../class/user.class');
const bcrypt = require("bcrypt");

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

// Get all users
async function getAllUsers() {
	const users = await User.find();
	const usersObject = users.map((user) => new UserObject(user));
	return usersObject;
}

// Get email by email
async function getUserByEmail(email) {
	const user = await User.find({ email: email });
	if(!user) {
		return null;
	} else {
		const userObject = new UserObject(user);
		return userObject;
	}
}

// Get user by email and password
async function getUserForLogin(email, password) {
    let result = false;
    const db_password = await User.findOne({ email: email }, 'password').exec();
    result = await bcrypt.compare(password, db_password.password);
    if(!result) {
        return null;
    } else {
	    const user = await User.find({ email: email, password: db_password.password});
        if(!user) {
            return null;
        } else {
            const userObject = new UserObject(user);
            return userObject;
        }
    }
}

// Get user by id
async function getUserById(id) {
    const user = await User.find({ _id: id });
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
    getUserById,
    getUserForLogin
};