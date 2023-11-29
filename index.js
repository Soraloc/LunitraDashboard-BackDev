const express = require('express');
const db = require('./dbconfig');
const users_route = require('./src/route/users.route');
const campaigns_route = require('./src/route/campaigns.route');
const characters_route = require('./src/route/characters.route');

const app = express();

app.use(express.json());
app.use('/users', users_route);
app.use('/campaigns', campaigns_route);
app.use('/characters', characters_route);

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