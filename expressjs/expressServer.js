 // Import the Express.js library
const express = require('express');

// Create an instance of an Express application
const app = new express();

// array of months
const months = ["January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"];

// route to fetch month
app.get("/fetchMonth/:num", (req, res) => {
    // parse number
    let num = parseInt(req.params.num);
    // check if valid month number
    if (num < 1 || num > 12) {
        // error
        res.send("Not valid number");
    } else {
        // get text month
        let month = months[num - 1]
        console.log(`Month: ${month}`)
        res.send(month)
    }
})

// Initialize an array to store login details
let loginDetails = [];

// Define the root route to send a welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the express server");
});

// Define a route to send login details as a JSON string
app.get("/loginDetails", (req, res) => {
    res.send(JSON.stringify(loginDetails));
});

// Define a route to handle login requests and store login details
app.post("/login/:name", (req, res) => {
    loginDetails.push({ "name": req.params.name, "login_time": new Date() });
    res.send(req.params.name + ", You are logged in!");
});

// Define a dynamic route to greet users by name
app.get("/:name", (req, res) => {
    res.send("Hello " + req.params.name);
});

// Start the server and listen on port 3333
app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});


