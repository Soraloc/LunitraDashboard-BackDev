const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DB_URL;

mongoose.connect(mongoString);
const database = mongoose.connection

module.exports = database;