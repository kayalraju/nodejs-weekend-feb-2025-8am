const mongoose = require('mongoose')
const Schema = mongoose.Schema
const joi = require('joi')
const { name } = require('ejs')

const UserSchemaValidation=joi.object({
    name: joi.string().required().min(3).max(20),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } }),
    phone: joi.string().required().min(10).max(10)
})

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
    
    module.exports={UserModel,UserSchemaValidation}
