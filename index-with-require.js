 // Import the HTTP module
const http = require('http');

// Import the 'today' module
const today = require('./today');

// Define the request listener function
const requestListener = function (req, res) {
    res.writeHead(200); // Set the status code to 200 (OK)
    // Send the response with the current date from the 'today' module

    const { dateString, hour } = today.getDateInfo();

    //determine greeting
    let greeting = "It is still not morning";
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Goof afternoon!";
    } else if (hour >= 18 && hour < 21) {
        greeting = "Good evening!";
    } else if (hour >= 21 && hour < 24) {
        greeting = "Good night!";
    }

    res.end(`${greeting} The date today is ${dateString}`);
};

// Define the port number
const port = 8080;

// Create an HTTP server using the request listener function
const server = http.createServer(requestListener);

// Start the server and listen on the specified port
server.listen(port);
console.log('Server listening on port: ' + port);
