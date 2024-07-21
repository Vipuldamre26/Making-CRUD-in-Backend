const express = require('express');
const userRouter = require('./routes/user');
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares')


const app = express();
const PORT = 8000;


// Connection

connectMongoDb('mongodb://127.0.0.1:27017/test-app1')



// Middleware   

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));



// Routes
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))