const express = require('express');
const AuthController = require('../controller/AuthController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();


router.post('/register',AuthController.register)
router.post('/login/user',AuthController.login)


router.all('/*',AuthCheck)
router.get('/user/dashboard',AuthController.dashboard)



module.exports = router;