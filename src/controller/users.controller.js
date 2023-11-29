const UserModel = require('../model/users.model');

exports.createUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}