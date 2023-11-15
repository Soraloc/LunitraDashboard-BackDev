const express = require('express');
const db = require('./dbconfig');

const app = express();

app.use(express.json());

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