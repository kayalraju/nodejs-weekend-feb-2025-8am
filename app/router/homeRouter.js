const express = require('express');
const HomeController = require('../controller/HomeController');
const router=express.Router()



router.get('/',HomeController.home);





module.exports=router;