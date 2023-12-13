const UserModel = require('../model/users.model');
const Token = require('../utils/token');

// est-ce que je met l'inscription ici ou dans users ?
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //crypter et décrypter le password pour le comparer à la base
    const user = await UserModel.find({email: email, password: password});
  
    if (!user.length) {
      res.status(400).json({
        success: false,
        message: 'Login failed',
      });
    }
  
		//est-ce que je fais des classes pour créer des objets ?
    delete user.password;
  
    const token = Token.generateToken(user);
  
    //l'envoie de token dans les cookies ne fonctionne pas
    Token.setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}