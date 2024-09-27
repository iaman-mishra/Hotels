const express = require('express');
const app = express();
const db= require('./db');
const person=require("./Modules/person");
const bodyParser = require('body-parser');      // Importing Body Parser
app.use(bodyParser.json());                     // using body parser
const menuItem=require("./Modules/menu");
const passport=require("./auth.js");
require("dotenv").config();


//--------------------------------------------------------Middleware functions--------------------------------------------------------------

//Authentication middleware Implementaion
app.use(passport.initialize()); //Initializing the Authentication middleware
const authenticate=passport.authenticate("local",{session:false}); //Authentication  variable


//logger middleware
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} Request made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);


// ------------------------------------------------------Defining server endpoints------------------------------------------------------

app.get("/",authenticate,(req,res)=>{ res.send("Welcome to home page") }); 

// Import Routers file 
const personRoutes=require("./routes/personRoutes");
const menuRoutes=require("./routes/menuRoutes");     

// Use Router file
app.use("/person",authenticate,personRoutes);
app.use("/menu",menuRoutes);

// Just a comment to test
const PORT=process.env.PORT || 3000;
app.listen(PORT); 

