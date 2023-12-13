const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
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
		type: String,
		default: 'member'
	},
	created_at: {
		required: true,
		type: Date,
		default: Date.now
	},
	validated: {
		required: true,
		type: Boolean,
		default: false
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
  return savedUser;
}

module.exports = {
  createUser
};