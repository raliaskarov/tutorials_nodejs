// ./routs/users.js
const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send((users));
  // res.send(JSON.stringify({users}, null, 4)); // optional stringify
});


// ---- specific routes ----
// helper
// sort
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
}


// GET by user last name
router.get("/lastName/:lastName", (req, res) => {
  // get last name
  const lastName = req.params.lastName;
  // filter 
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  res.send(filtered_lastname);
});

// ---- generic routes ----

// route handler for sorting
router.get("/sort", (req, res) => {
  // sort array
  let sorted_users = users.sort(function(a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1 - d2;
  });
  // send 
  res.send(sorted_users);
})

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // extract email parameter from the request url
  const email = req.params.email;
  // filter
  let filtered_users = users.filter((user) => user.email === email);
  // send filtered array to client
  res.send(filtered_users)//This line is to be replaced with actual return value
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  res.send("The user " + req.query.firstName + " has been added.")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0){
    // select
    let filtered_user = filtered_users[0];

    // extract and update DOB
    let DOB = req.query.DOB;
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    // extract and update firstName
    let firstName = req.query.firstName;
    if (firstName) {
      filtered_user.firstName = firstName;
    }

    // extract and update lastName
    let lastName = req.query.lastName;
    if (lastName) {
      filtered_user.lastName = lastName;
    }

    // replace old user entry
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    
    // report success
    res.send(`User with email ${email} updated`);
  } else {
    // report error
    res.send("Unable to find user");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // get email
  const email = req.params.email;
  //filter
  users = users.filter((user) => user.email != email);
  //send
  res.send(`User with email ${email} deleted.`);
});




module.exports=router;
