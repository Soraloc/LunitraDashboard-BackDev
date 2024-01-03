const UserModel = require('../model/users.model');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'All users',
      data,
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}