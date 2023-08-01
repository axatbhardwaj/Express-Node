const http = require('http');
//console.log('Express Tutorial')
const server = http.createServer((req, res) => {
    console.log("user hit the server");

    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>home Page</h1>');
        res.end();
    }
    else if (url === "/about") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>About Page</h1>');
        res.end();
    }
    else {
        res.writeHead(400, { 'content-type': 'text/html' })
        res.write("<h1>ERROR</h1>")
    }
})

server.listen(5000, () => {
    console.log('Server listening on port : 5000....')
})
