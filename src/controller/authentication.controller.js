const UserModel = require('../model/users.model');
const Token = require('../utils/token');
const bcrypt = require("bcrypt");
const transporter = require('../../config/transporterconfig');

require('dotenv').config();

async function loginUser (req, res) {
  try {
    // Récupération des données saisies par l'utilisateur
    let result = false;
    const { email, password } = req.body;
    // Crypter et décrypter le password pour le comparer à la base
    const db_password = await UserModel.getPasswordByEmail(email);
    if(!db_password) {
      res.status(400).json({
        success: false,
        message: 'Password not found',
      });
    } else {
      result = bcrypt.compare(db_password, password);
      if(!result) {
        res.status(400).json({
          success: false,
          message: 'Password incorrect',
        });
      } else {
        const user = await UserModel.getUserByEmail(email);
        if(!user) {
          res.status(400).json({
            success: false,
            message: 'Login failed',
          });
        } else {
          user.id[0].set({ password: undefined });
          //delete user.password;
        
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
      }
    }
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Inscription de l'utilisateur
async function registerUser (req, res) {
  try {
    const userAttributes = req.body;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

    // Vérification des champs vides
    if (!userAttributes.username || !userAttributes.email || !userAttributes.password) {
      res.status(400).json({
        success: false,
        message: 'Missing parameters'
      });
    }
    // Vérification de l'email avec la regex
    else if (userAttributes.email.match(regexEmail) == null) {
      res.status(400).json({
        success: false,
        message: 'Email is not valid'
      });
    }
    // Vérification du mot de passe avec la regex
    else if (userAttributes.password.match(regexPwd) == null) {
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
    userAttributes.password = await bcrypt.hash(userAttributes.password, saltRounds);
    user = await UserModel.createUser(userAttributes);

    await verificationMail(user);

    res.status(200).json({
      success: true,
      message: 'User created',
      user: user
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// Vérification de l'utilisateur
async function verifyUser (req, res) {
  const verifyToken = req.params.token;
  if (!verifyToken) {
    res.status(400).json({
      success: false,
      message: 'Missing verify token'
    });
  }
  else {
    const user = await UserModel.deleteVerifyToken(verifyToken);;
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid verify token'
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: 'User verified',
        user: user
      });
    }
  }
}

// Vérification de l'utilisateur
async function verificationMail (user) {
  const mailOptions = {
    from: '"Nicolas PREAUX" <nicolas.preaux83@gmail.com>',
    to: user.id.email,
    subject: "Blip",
    text: "http://localhost:3000/auth/verify/" + user.id.verifyToken,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = {
  loginUser,
  registerUser,
  verifyUser
}