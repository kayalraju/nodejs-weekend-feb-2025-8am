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

//setup body parser
app.use(express.json({
    limit:'50mb',
    extended:true
}));

app.use(express.urlencoded({extended:true}))

const homeRoute=require('./app/router/homeRouter')
app.use(homeRoute);

const apiRoute=require('./app/router/ApiRoute')
app.use('/api',apiRoute);

const port=3005;

app.listen(port,()=>{
    console.log('server is running on port 3005');
    
})