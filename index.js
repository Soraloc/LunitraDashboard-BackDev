const express = require('express');
const db = require('./dbconfig');
const routes = require('./src/route/route');

const app = express();

app.use(express.json());
app.use('/api', routes);

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