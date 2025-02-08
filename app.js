const express = require("express");


const app=express();


const homeRoute=require('./app/router/homeRouter')
app.use(homeRoute);


const port=3005;

app.listen(port,()=>{
    console.log('server is running on port 3005');
    
})