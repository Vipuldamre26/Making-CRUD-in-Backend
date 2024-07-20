const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('hello from homepage')
})

app.get('/about', (req, res) => {
    return res.send('hello from about page');
})
 

// we do not need this two line if we have express, express handle http internally
// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log('Server started'));

app.listen(8000, () => console.log('Server started')) 