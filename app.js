const express = require("express");
const ejs=require('ejs');
const dotenv=require('dotenv');
const connectDB=require('./app/config/db')

dotenv.config();
const app=express();
connectDB()
//set view engine
app.set('view engine','ejs');
app.set('views','views')

const homeRoute=require('./app/router/homeRouter')
app.use(homeRoute);


const port=3005;

app.listen(port,()=>{
    console.log('server is running on port 3005');
    
})