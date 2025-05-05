// router/auth_users.js
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// check username 
const isValid = (username)=>{ //returns boolean
  return !users.some(user => user.username === username);
}

// check if user is authenticated
const authenticatedUser = (username,password)=>{ //returns boolean
let validusers = users.filter((user) => {
  return user.username === username && user.password === password;
});
return validusers.length > 0;
}

//login route
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body; // destructure request body
  
  if (! username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) { //on successful authentication
    let accessToken = jwt.sign(
      {
      data: password                // payload
      },                            // authentication key
      'access',                           
      { expiresIn: 60 * 60 });      // 1 hour expiry

    req.session.authorization = {
      accessToken, username         // stash username and token in auth session
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(401).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review; // form URL: ?review=your+text
  const sessionAuth = req.session.authorization
  const username = sessionAuth && sessionAuth.username

  console.log("const username: ", username)

  // check if logged in
  if (!username) {
    return res.status(403).json({ message: "Please login" });
  }

  // check if review provided
  if (!review) {
    return res.status(400).json({ message: "Please add review text" });
  }

  // find book
  const book = books.find(b => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ message: `No book with ISBN ${isbn}` });
  }

  // add or update review
  book.reviews[username] = review;

  return res
    .status(200)
    .json({
      message: "Review posted successfully",
      reviews: book.reviews
    });
});

// DELETE review
regd_users.delete("/auth/review/delete/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const sessionAuth = req.session.authorization;
  const username = sessionAuth && sessionAuth.username;

  console.log("Deleting review by user ,", username);

  // check if logged in
  if (!username) {
    return res.status(403).json({ message: "Please login"});
  }

  // find book
  const book = books.find(b => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ message: 'Wrong ISBN'} );
  }

  // check if there is review
  if (!book.reviews[username]) {
    return res.status(404).json({ message: "There is no review to delete"} );
  }

  // delete review
  delete book.reviews[username];

  return res
    .status(200)
    .json({
      message: "Review deleted"
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
