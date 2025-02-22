const express = require('express');
const ApiController = require('../controller/ApiController');
const StudentImage = require('../helper/studentImage');
const router = express.Router();



router.post('/create/student',StudentImage.single('image'),ApiController.createStudent)
router.get('/student',ApiController.getStudent)
router.get('/edit/student/:id',ApiController.editStudent)
router.post('/update/student/:id',ApiController.updateStudent)
router.delete('/delete/student/:id',ApiController.deleteStudent)

router.get('/slug/student/:slug',ApiController.getdataSlugStudent)
router.post('/search',ApiController.search)


module.exports = router;