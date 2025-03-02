const express = require("express");
const ejs=require('ejs');
const dotenv=require('dotenv');
const path=require('path');
const connectDB=require('./app/config/db')
const cors=require('cors');
const session=require('express-session');
const flash=require('connect-flash');
const cookieParser=require('cookie-parser');

dotenv.config();
const app=express();
connectDB()

app.use(cors());

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))
  app.use(flash());

  app.use(cookieParser());

//   app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
//   });
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