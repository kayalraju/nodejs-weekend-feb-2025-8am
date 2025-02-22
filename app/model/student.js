const mongoose = require('mongoose')
const Schema = mongoose.Schema

  const StudentSchema=  new Schema({
        name:{
            type:String,
            required:[true,"please enter your name"],  
        },
        city:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

       const StudentModel=mongoose.model('student',StudentSchema)
       module.exports=StudentModel