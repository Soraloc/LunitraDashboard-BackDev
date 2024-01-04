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

module.exports = {
  getAllUsers
}