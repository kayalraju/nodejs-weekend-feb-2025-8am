const express = require('express');
const AuthController = require('../controller/AuthController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();


router.post('/register',AuthController.register)
router.post('/verify',AuthController.verify)
router.post('/login/user',AuthController.login)


router.all('/*',AuthCheck)
router.get('/user/dashboard',AuthController.dashboard)
router.post('/update/password',AuthController.updatePassword)



module.exports = router;