const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema= Schema({
    productName:{
        type:String,
        require:true
    },
    productPrice:{
        type:Number,
        require:true
    },
    productDescription:{
        type:String,
        require:true
    },
    wishlist:{
        type: Boolean,
        default: false,
    },
    photo:{
        type: Array,
        require: false,
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"subcategory"
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"category"
    },
    status: {
        type: Boolean,
        default: false,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createOn:{
        type: Date,
        default:new Date()
    },
    updateOn:{
        type: Date,
        default:new Date()
    }
})

const productModel=mongoose.model("product",productSchema)
module.exports=productModel