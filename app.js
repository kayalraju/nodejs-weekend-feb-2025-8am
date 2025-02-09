const express = require("express");
const ejs=require('ejs');


const app=express();

//set view engine
app.set('view engine','ejs');
app.set('views','views')

const homeRoute=require('./app/router/homeRouter')
app.use(homeRoute);


const port=3005;

app.listen(port,()=>{
    console.log('server is running on port 3005');
    
})