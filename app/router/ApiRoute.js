const express = require('express');
const ApiController = require('../controller/ApiController');
const router = express.Router();



router.post('/create/student',ApiController.createStudent)
router.get('/student',ApiController.getStudent)
router.get('/edit/student/:id',ApiController.editStudent)
router.post('/update/student/:id',ApiController.updateStudent)
router.delete('/delete/student/:id',ApiController.deleteStudent)


module.exports = router;