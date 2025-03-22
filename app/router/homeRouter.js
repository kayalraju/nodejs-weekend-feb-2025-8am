const express = require('express');
const HomeController = require('../controller/HomeController');
const StudentImage = require('../helper/studentImage');
const router=express.Router()



router.get('/',HomeController.home);
router.get('/add',HomeController.addView);
router.post('/create/user',StudentImage.single('image'),HomeController.createUser);
router.get('/edit/user/:id',HomeController.editUser);
router.post('/update/user/:id',HomeController.updateUser);
router.get('/delete/user/:id',HomeController.deleteUser);


//router.post('/joi',HomeController.joivalidate);





module.exports=router;