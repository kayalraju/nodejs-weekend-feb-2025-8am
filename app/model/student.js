const mongoose = require('mongoose')
const Schema = mongoose.Schema

  const StudentSchema=  new Schema({
        name:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
    },
    {
        timestamps:true,
        versionKey:false
    }
)

       const StudentModel=mongoose.model('student',StudentSchema)
       module.exports=StudentModel