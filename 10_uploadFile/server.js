const express = require('express');
const path = require('path');
const dbConnection = require('./connect');

const PORT = 8008;
const app = express();


// database connections 

dbConnection('')



// set the view engine to ejs

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// Middlewares 

app.use(express.json());


// Routes 

app.get('/', (req, res) => {
    return res.render('homepage');
});



app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))