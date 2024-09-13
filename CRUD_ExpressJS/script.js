const express = require('express');
const app = express();
const Port = 3000;
const todoRoutes = require('./Routes/todos');
const database = require('./config/database');

app.use(express.json());

app.use('/express', todoRoutes);

app.get('/',function(req,res){
    res.send('HOME');
})

app.listen(Port, () => {
    console.log(`Server Started ${Port}`);
})

database();