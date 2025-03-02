const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,
        versionKey: false
    })

    const UserModel=mongoose.model('user',UserSchema)  
    
    module.exports=UserModel
