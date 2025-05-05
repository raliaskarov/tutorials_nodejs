// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({       // create session object per request
    secret:"fingerprint_customer",
    resave: true, 
    saveUninitialized: true         // persist empty session back to the store and issue a cookie
}));

// auth
app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization) { // get auth token
        const { accessToken } = req.session.authorization; // retrieve token
        jwt.verify(accessToken, "access", (err, user) => { // jwd to verify token
            if (err) {
                return res.status(403).json({ message: "User not logged in" });
            }
            req.user = user;
            next();
        });
        } else {
            return res.status(403).json({ message: "User not logged in" });
    }
});
 
// mount routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// listen
const PORT =5000;
app.listen(PORT,()=>console.log("Server is running"));
