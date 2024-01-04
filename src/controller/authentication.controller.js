const UserModel = require('../model/users.model');
const Token = require('../utils/token');
const bcrypt = require("bcrypt");
const transporter = require('../../config/transporterconfig');

// est-ce que je met l'inscription ici ou dans users ?
async function loginUser (req, res) {
  try {
    const { email, password } = req.body;
    // Crypter et décrypter le password pour le comparer à la base
    const user = await UserModel.find({email: email, password: password});
  
    if (!user.length) {
      res.status(400).json({
        success: false,
        message: 'Login failed',
      });
    }
  
		// Est-ce que je fais des classes pour créer des objets ?
    delete user.password;
  
    const token = Token.generateToken(user);
  
    // L'envoie de token dans les cookies ne fonctionne pas
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

// Inscription de l'utilisateur
async function registerUser (req, res) {
  try {
    const usersAttributes = req.body;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

    // Vérification des champs vides
    if (!usersAttributes.username || !usersAttributes.email || !usersAttributes.password) {
      res.status(400).json({
        success: false,
        message: 'Missing parameters'
      });
    }
    // Vérification de l'email avec la regex
    else if (usersAttributes.email.match(regexEmail) == null) {
      res.status(400).json({
        success: false,
        message: 'Email is not valid'
      });
    }
    // Vérification du mot de passe avec la regex
    else if (usersAttributes.password.match(regexPwd) == null) {
      res.status(400).json({
        success: false,
        message: 'Password is not valid. Please verify that the password contains at least 8 characters with:\n- 1 lowercase character [a-z]\n- 1 uppercase character [A-Z]\n- 1 number [0-9]\n- 1 special character [@$!%*?&]'
      });
    }

    /* const userDatabase = await UserModel.getUserByEmail(usersAttributes.email);
    console.log(userDatabase);
    const emailExist = userDatabase.getEmail();
    if(emailExist) {
      res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    } */

    // Hachage du mot de passe avec bcrypt
    const saltRounds = 10;
    usersAttributes.password = await bcrypt.hash(usersAttributes.password, saltRounds);
    user = await UserModel.createUser(usersAttributes);

    res.status(200).json({
      success: true,
      message: 'User created',
      user: user
    });

    await verificationMail(user);
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

async function verifyUser (req, res) {
  
}

// Vérification de l'utilisateur
async function verificationMail (user) {
  /*
  const mailOptions = {
    from: '"Nicolas PREAUX" <nicolas.preaux83@gmail.com>',
    to: "garambois.lucas@gmail.com",
    subject: "Blip",
    text: "Bloup bloup blip?",
    html: "<b>Bloup bloup blip?</b>"
  };
  await transporter.sendMail(mailOptions);
  */
}

module.exports = {
  loginUser,
  registerUser,
  verifyUser
}