const nodemailer = require("nodemailer");

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_ID,
    pass: process.env.BREVO_PWD,
  },
});

// Vérification de la connexion au serveur SMTP
transporter.verify(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = transporter;