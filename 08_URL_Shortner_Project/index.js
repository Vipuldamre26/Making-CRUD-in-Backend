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



// set the view engine to ejs
app.set('view engine', 'ejs');


// Middleware

app.use(express.json());

// Routers

app.use('/test', (req, res) => {
    res.end('<h1>Hello from server</h1>');
})


app.use('/url', urlRoute);
app.get('/url/:shortId', handleRedirectURL);


app.listen(PORT, console.log(`server started at ${PORT}`));