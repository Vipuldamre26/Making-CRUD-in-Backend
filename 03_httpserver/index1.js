const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: New Req received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        res.end('Hello from server again');
    })
})

myServer.listen(8080, () => console.log('server started'));
