const express = require("express");
const ejs=require('ejs');
const dotenv=require('dotenv');
const path=require('path');
const connectDB=require('./app/config/db')
const cors=require('cors');

dotenv.config();
const app=express();
connectDB()

app.use(cors());
//set view engine
app.set('view engine','ejs');
app.set('views','views')

//setup body parser
app.use(express.json({
    limit:'50mb',
    extended:true
}));
//static folder
app.use(express.static('public'));

app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads'));  
app.use(express.urlencoded({extended:true}))

const homeRoute=require('./app/router/homeRouter')
app.use(homeRoute);

const apiRoute=require('./app/router/ApiRoute')
app.use('/api',apiRoute);

const port=3005;

app.listen(port,()=>{
    console.log('server is running on port 3005');
    
})