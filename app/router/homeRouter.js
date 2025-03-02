const express = require('express');
const HomeController = require('../controller/HomeController');
const router=express.Router()



router.get('/',HomeController.home);
router.get('/add',HomeController.addView);
router.post('/create/user',HomeController.createUser);
router.get('/edit/user/:id',HomeController.editUser);
router.post('/update/user/:id',HomeController.updateUser);
router.get('/delete/user/:id',HomeController.deleteUser);





module.exports=router;