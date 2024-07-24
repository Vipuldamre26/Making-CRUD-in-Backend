const express = require('express');
const urlRoute = require('./routes/urlRouter');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const { handleRedirectURL } = require('./controllers/urlController');

const app = express();
const PORT = 8001;


// Connections 

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('mongodb connected'));


// Middleware

app.use(express.json());

// Routers

app.use('/url', urlRoute);
app.get('/:shortId', handleRedirectURL);


app.listen(PORT, console.log(`server started at ${PORT}`));