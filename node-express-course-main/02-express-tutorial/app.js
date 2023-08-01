const http = require('http');
//console.log('Express Tutorial')

const server = http.createServer((req, res) => {
    console.log("user hit the server");
    res.end("Hey ! Home Page");
})

server.listen(5000, () => {
    console.log('Server listening on port : 5000....')
})
