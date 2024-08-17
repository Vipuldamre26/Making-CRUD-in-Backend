const express = require('express');

const urlRoute = require('./routes/urlRouter');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const { connectToMongoDB } = require('./connect');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly } = require('./middlewares/auth')


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
app.use(cookieParser());


// Routers

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);


app.listen(PORT, console.log(`server started at ${PORT}`));