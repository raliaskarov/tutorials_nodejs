// router/general.js
const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;


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

// call axios
const axios = require('axios');

// get books with promise
function fetchBooksWithPromises() {
  axios.get('http://localhost:5000/')
  .then(response => {
    console.log('Books (via promises):', response.data);
  })
  .catch(err => {
    console.error('Error fetching books:', err.message);
  });
}

// get books with  async/await
async function fetchBooksAsync() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('Books (Via async/await):', response.data);
  } catch (err) {
    console.error('Error fetching books:', err.message);
  }
}

// get book by isbn with promise
function fetchBookByIsbnWithPromise(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
  .then(response => {
    console.log(`Books with isbn with Promise: ${isbn}: `,
      response.data);
  })
  .catch(err => {
    console.error(`Error fetching ISBN ${isbn}`, err.message);
  });
}

// get book by isbn with async
async function fetchBookByIsbnWithAsync(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(`Book with isbn ${isbn} with Async/await: `,
      response.data);
  } catch (err) {
    console.error(`Error fetching ISBN ${isbn}: `, err.message);
  }
}

// get book by author with promise
function fetchBookByAuthorWithPromise(author) {
  axios.get(`http://localhost:5000/author/${author}`) // url
  .then(response => {
    console.log(`Result with promise for author: ${author}: `,
      response.data);
  })
  .catch(err => {
    console.error(`Error while getting by author ${author} with Promise: `,
      err.message);
  })
}

// get book by author with async/wait
async function fetchBookByAuthorWithAsync(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(`Result for author ${author} with async/await: `,
      response.data);
  } catch (err) {
    console.error(`Error: while getting for author ${author} with async/await: `,
      err.message);
  }
}

// get book by title with promise
function fetchBookByTitleWithPromise(title) {
  axios.get(`http://localhost:5000/title/${title}`)
  .then(response => {
    console.log(`By title with promise: `,
      response.data)
  })
  .catch(err => {
    console.error(`Error while getting by title with promise: `,
      err.message);
  })
}

// get book by title with async/await
async function fetchBookByTitleWithAsync(title) {
  try{
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(`Result with async by title:`,
      response.data);
  } catch (err) {
    console.error(`Error while getting by title with async: `,
      err.message);
  }
}

// invoke
fetchBooksWithPromises();
fetchBooksAsync();
fetchBookByIsbnWithPromise(3);
fetchBookByIsbnWithAsync(4);
fetchBookByAuthorWithPromise("Jane Austen");
fetchBookByAuthorWithAsync("Dante Alighieri");
fetchBookByTitleWithPromise("The Book Of Job");
fetchBookByTitleWithAsync("The Epic Of Gilgamesh");