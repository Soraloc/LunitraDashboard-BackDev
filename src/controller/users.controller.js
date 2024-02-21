const UserModel = require('../model/users.model');

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'All users',
      users: users
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Get user by id
async function getUserById(req, res) {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User found',
      user: user
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById
}