const express = require('express');
const app = express();
const db= require('./db');
const person=require("./Modules/person");
const bodyParser = require('body-parser');      // Importing Body Parser
app.use(bodyParser.json());                     // using body parser
const menuItem=require("./Modules/menu");
require("dotenv").config();


// ---------------------------------Defining server endpoints------------------------------------------------------

app.get("/",(req,res)=>{ res.send("Welcome to home page") }); 

// Import Routers file 
const personRoutes=require("./routes/personRoutes");
const menuRoutes=require("./routes/menuRoutes");     

// Use Router file
app.use("/person",personRoutes);
app.use("/menu",menuRoutes);

// Just a comment to test
const PORT=process.env.PORT || 3000;
app.listen(PORT); 
