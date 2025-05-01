 // Import the Express.js library
 const express = require('express');

 // Create an instance of an Express application
 const app = new express();
 
 // Define the port number
 const port = 8080;
 
 // Route to handle requests to the root path "/"
 app.get("/", (req, res) => {
     return res.send("Hello World!");
 });
 
// Route parameter example: GET /user/:id
//    e.g. GET http://localhost:8080/user/42
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    // pretend to fetch user data…
    res.json({ userId, name: `User${userId}` });
  });

// query string example
// e.g. GET http://localhost:8080/search?q=express
app.get("/search", (req, res) => {
    const term = req.query.q || "";
    // pretend to search
    res.send(`Giving results for: ${term}`)
})

// REST search string example
// e.g. GET http://localhost:8080/search?q=express
app.get("/restsearch/:term", (req, res) => {
    const term = req.params.term;
    // pretend to search
    res.send(`Giving results for: ${term}`)
})

// POST echo endpoint: POST /data
//    e.g. curl -X POST http://localhost:8080/data \
//              -H "Content-Type: application/json" \
//              -d '{"foo":"bar"}'
app.post("/data", (req, res) => {
    // echoes back whatever JSON you send
    res.json({
      message: "Got your data!",
      yourPayload: req.body
    });
  });

 // Start the server and listen on the specified port
 let server = app.listen(port, () => {
     console.log("Listening at http://localhost:" + port);
 });