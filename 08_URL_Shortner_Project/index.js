const express = require('express');

const urlRoute = require('./routes/urlRouter');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const { handleRedirectURL } = require('./controllers/urlController');
const path = require('path');

const app = express();
const PORT = 8001;


// Connections 

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('mongodb connected'));



// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))



// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// Routers

app.use('/url', urlRoute);
app.use('/user', userRoute);
app.get('/url/:shortId', handleRedirectURL);
app.use('/', staticRoute);


app.listen(PORT, console.log(`server started at ${PORT}`));