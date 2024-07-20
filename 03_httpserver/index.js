const http = require('http');

const myServer = http.createServer((req, res) => {
    console.log(req);
    console.log('new req received');
    res.end('hello from server');
});

myServer.listen(8000, () => console.log('server started'));