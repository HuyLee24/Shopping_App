const express = require('express');
const app = express();
const mongoose = require('mongoose')

//Routes
app.get('/', (req, res) => {
    res.send('This is Home page');
});

app.get('/posts', (req, res) => {
    res.send('This is on posts');    
});

//Connect to Database
mongoose.connect(
    'mongodb+srv://huyle:danhbacom123@cluster0-4nt6t.mongodb.net/test', 
    { useNewUrlParser: true }, 
    () => console.log('Connected to DB!')
);

//Listening to the server
app.listen(3000);