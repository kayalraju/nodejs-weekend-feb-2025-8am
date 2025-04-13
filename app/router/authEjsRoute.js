const express = require('express');
const AuthEjsController = require('../controller/AuthEjsController');
const AuthCheck = require('../middleware/AuthCheck');


const router = express.Router();


router.get('/register', AuthEjsController.register)
router.post('/register/create', AuthEjsController.registerCreate)
router.get('/login', AuthEjsController.login)
router.post('/login/create', AuthEjsController.loginCreate)
router.get('/dashboard', AuthCheck, AuthEjsController.CheckAuth, AuthEjsController.dashboard)
router.get('/logout', AuthCheck, AuthEjsController.logout)



module.exports = router;