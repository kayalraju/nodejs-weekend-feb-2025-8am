const express=require('express');
const CsvController = require('../controller/CsvController');
const router=express.Router();
const bodyparser=require('body-parser');

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));

const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvupload'),function(error,success){
            if(error) throw error;
        })
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage});

router.post('/csv',upload.single('file'),CsvController.csvcreate)

module.exports=router;