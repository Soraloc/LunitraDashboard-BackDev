const express = require('express');
const db = require('./config/dbconfig');
const users_route = require('./src/route/users.route');
const campaigns_route = require('./src/route/campaigns.route');
const characters_route = require('./src/route/characters.route');
const authentication_route = require('./src/route/authentication.route');
const locations_route = require('./src/route/locations.route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Nécessaire ??
/*app.use(bodyParser.urlencoded({
  extended: true
}));*/

app.use(express.json());
app.use('/users', users_route);
app.use('/campaigns', campaigns_route);
app.use('/characters', characters_route);
app.use('/auth', authentication_route);
app.use('/locations', locations_route);

// setting port
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})

// test connexion base de données
db.on('error', (error) => {
  console.log(error)
})
db.once('connected', () => {
  console.log('Database Connected');
})