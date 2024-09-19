const mongoose = require('mongoose');

require('dotenv').config();
const URL = process.env.DATABASE_URL;

exports.dbConnect = () => {
    mongoose.connect(URL)
    .then(() => {
        console.log("Database Connected")
    })
    .catch((error) => {
        console.error(error);
        console.log("Database Error")
    });
};