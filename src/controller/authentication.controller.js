const UserModel = require('../model/users.model');
const Token = require('../utils/token');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// est-ce que je met l'inscription ici ou dans users ?
async function loginUser (req, res) {
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

// Inscription de l'utilisateur
async function registerUser (req, res) {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    console.log(regexEmail);
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

    // Vérification de l'email avec la regex
    if (email.match(regexEmail) == null) {
      res.status(400).json({
        sucess: false,
        message: 'Email is not valid'
      });
    }

    // Vérification du mot de passe avec la regex
    if (password.match(regexPwd) == null) {
      res.status(400).json({
        success: false,
        message: 'Password is not valid. Please verify that the password contains at least 8 characters with:\n- 1 lowercase character [a-z]\n- 1 uppercase character [A-Z]\n- 1 number [0-9]\n- 1 special character [@$!%*?&]'
      });
    }

    // Hachage du mot de passe (bloup bloup)
    const salt = bloup;
    bcrypt.genSalt(salt, function(err, salt) {
      bcrypt.hash(password, salt, function(err, salt) {
        UserModel.createUser(username, email, password);
      })
    });

    /*
    const transporter = nodemailer.createTransport({
      host: ,
      port: ,
      secure: ,
      auth: {
        user: ,
        pass: ,
      },
    });
    

    // Mail de vérification envoyé au user après inscription
    const verifMail = await transporter.sendMail({
      from: '"Bloubloup" <bloup@gmail.com>',
      to: email,
      subject: "Blip",
      text: "Bloup bloup blip?",
      html: "<b>Bloup bloup blip?</b>"
    });
    */
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Vérification de l'utilisateur
async function verificationUser (req, res) {
  
}

module.exports = {
  loginUser,
  registerUser,
  verificationUser
}