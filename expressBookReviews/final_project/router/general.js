// router/general.js
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (isValid (username)) {
      users.push ({ "username": username, "password": password });
      return res.status(200).json({ message: "User succfully registered. You can now login" });
    } else {
      return res.status(404).json({ message: "User already exists" });
    }
  }
  return res.status(404).json({ message: "Please provide username and password" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.status(200).json((books))
//  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // get isbn
  const isbn = req.params.isbn;
  // filter
  let filtered_books = books.filter((book) => book.isbn === isbn);
  res.status(200).json(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = books.filter((book) => book.author === author);
  res.status(200).json(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = books.filter((book) => book.title === title);
  res.status(200).json(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let book = books.find(b => b.isbn === isbn);

  if (!book) {
    return res
    .status(404)
    .json({ message: `No book with ISBN ${isbn}`})
  }
  return res
    .status(200)
    .json({ reviews: book.reviews })
});

module.exports.general = public_users;
