let http = require('http');

http.createServer(function (req, res) {
    res.write('hello from server'); // write a response to the client
    res.end(); // end of response from server
}).listen(3000); // server listens on port 6000