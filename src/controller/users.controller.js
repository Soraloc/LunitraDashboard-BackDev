const UserModel = require('../model/users.model');
const UserClass = require('../class/user.class');

exports.createUser = async (req, res) => {
  try {
    user = await UserModel.createUser(req.body);
    userObject = new UserClass(user._id, user.username, user.email, user.password, user.role, user.created_at, user.validated);
    res.status(200).json(userObject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}