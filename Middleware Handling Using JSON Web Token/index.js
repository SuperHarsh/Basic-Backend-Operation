const express = require("express");
const app = express();
const cp = require('cookie-parser');
const user = require('./routes/user');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cp());
app.use(express.json());

require('./config/database').dbConnect();

app.use('/supersite',user);

app.listen(PORT, () => {
    console.log("PORT is Started");
})
