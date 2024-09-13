const mongoose = require('mongoose');

require('dotenv').config();

const dbconnect = () => {
    mongoose.connect( process.env.URL)
    .then( () => {console.log('Database Connected')})
    .catch((error) => {console.error(error.message)})
}

module.exports = dbconnect;