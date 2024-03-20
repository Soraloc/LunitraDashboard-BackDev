const UserModel = require('../model/users.model');
const Token = require('../utils/token');
const bcrypt = require("bcrypt");
const transporter = require('../../config/transporterconfig');

require('dotenv').config();

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const REGEX_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
const SALT_ROUND = 10;

async function loginUser (req, res) {
  try {
    // Récupération des données saisies par l'utilisateur
    let result = false;
    const { email, password } = req.body;
    // Crypter et décrypter le password pour le comparer à la base
    const db_password = await UserModel.getPasswordByEmail(email);
    if(!db_password) {
      res.status(400).json({ // 400: Bad Request
        success: false,
        message: 'Password not found',
      });
    } else {
      result = bcrypt.compare(db_password, password);
      if(!result) {
        res.status(400).json({
          success: false,
          message: 'Password incorrect'
        });
      } else {
        const user = await UserModel.getUserByEmail(email);
        if(!user) {
          res.status(400).json({
            success: false,
            message: 'Login failed'
          });
        } else {
          delete user.password;
          const token = Token.generateToken(user, "SESSION");
          // L'envoie de token dans les cookies ne fonctionne pas
          Token.setTokenCookie(res, token);

          res.status(200).json({
            success: true,
            message: 'Login successful',
            user,
            token
          });
        }
      }
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Inscription de l'utilisateur
async function registerUser(req, res) {
  try {
    const userAttributes = req.body;
    // Nouvelle variable, stockant les données de l'utilisateur liées à l'email pour vérifier si l'email existe déjà
    const userDatabase = await UserModel.getUserByEmail(userAttributes.email);

    // Vérification des champs vides
    if (!userAttributes.username || !userAttributes.email || !userAttributes.password) {
      res.status(400).json({
        success: false,
        message: 'Missing parameters'
      });
    }
    // Vérification de l'email avec la regex
    else if (userAttributes.email.match(REGEX_EMAIL) == null) {
      res.status(400).json({
        success: false,
        message: 'Email is not valid'
      });
    }
    // Vérification de l'existence de l'email
    else if (userDatabase) {
      res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    // Vérification du mot de passe avec la regex
    else if (userAttributes.password.match(REGEX_PWD) == null) {
      res.status(400).json({
        success: false,
        message: 'Password is not valid. Please verify that the password contains at least 8 characters with:\n- 1 lowercase character [a-z]\n- 1 uppercase character [A-Z]\n- 1 number [0-9]\n- 1 special character [@$!%*?&]'
      });
    }
    else {
      // Hachage du mot de passe avec bcrypt
      userAttributes.password = await bcrypt.hash(userAttributes.password, SALT_ROUND);
      user = await UserModel.createUser(userAttributes);

      await verificationMail(user);

      res.status(200).json({
        success: true,
        message: 'User created',
        user: user
      });
    }
  }
  catch (error) {
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

// Envoi du mail de vérification
async function verificationMail (user) {
  const mailOptions = {
    from: '"Nicolas PREAUX" <nicolas.preaux83@gmail.com>',
    to: user.email,
    subject: "Blip",
    text: "http://localhost:3000/auth/verify/" + user.verifyToken,
  };
  await transporter.sendMail(mailOptions);
}

async function changePassword(req, res) {
  try {
    let { email, password, newPassword } = req.body;
    const user = await UserModel.getUserByEmail(email);

    if(!bcrypt.compareSync(password, user.id.password)) {
      res.status(400).json({
        success: false,
        message: 'Password is not valid'
      });
    }

    // Vérification du mot de passe avec la regex
    if (newPassword.match(REGEX_PWD) == null) {
      res.status(400).json({
        success: false,
        message: 'Password is not valid. Please verify that the password contains at least 8 characters with:\n- 1 lowercase character [a-z]\n- 1 uppercase character [A-Z]\n- 1 number [0-9]\n- 1 special character [@$!%*?&]'
      });
    } else {
      newPassword = await bcrypt.hash(newPassword, SALT_ROUND);
      await UserModel.updatePasswordUser(user.id._id, newPassword);
      res.status(200).json({
        success: true,
        message: 'Password modified'
      });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function testRefreshToken(req, res) {
  res.status(200).json({
    success: true,
    message: 'Youhou'
  });
}

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  changePassword,
  testRefreshToken
}