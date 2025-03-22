const User=require('../model/user');
const { hashedPassword, comparePassword } = require('../middleware/Auth');
const jwt=require('jsonwebtoken');

class AuthController {

    async register(req,res){
        try{
            const {name,email,phone,password}=req.body;
            if((name==''||email==''||phone==''||password=='')){
               return res.status(400).json({
                    status:false,
                    message:'All fields are required'
                })  
            }
            const existUser=await User.findOne({email});
            if(existUser){
                return res.status(400).json({
                    status:false,
                    message:'User already exist'
                })
            }
            const hashedPas=await hashedPassword(password)
            const userdata=new User({
                name,
                email,
                phone,
                password:hashedPas
            })
           const data= await userdata.save();
           return res.status(201).json({
            status:true,
            message:'User register Succesfully',
            data:data
        })

        }catch(err){
            return res.status(201).json({
                status:false,
                message:err.message,
              
            })
        }

    }


    async login(req,res){
        //console.log(req.body);
        
        try{
            const {email,password}=req.body;
            if((email==''||password=='')){
               return res.status(400).json({
                    status:false,
                    message:'All fields are required'
                })
            }
            const user=await User.findOne({email});
            //console.log('user',user);
            
            if(!user){
                return res.status(400).json({
                    status:false,
                    message:'User not exist'
                })
            }
            const isMatchPassword= await comparePassword(password,user.password)
            if(!isMatchPassword){
                return res.status(400).json({
                    status:false,
                    message:'Invalid password'
                })
            }
            const token=jwt.sign({
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
            },process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
           
            return res.status(201).json({
                status:true,
                message:'User login Succesfully',
                data:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                },
                token:token
            })
            
        }catch(err){
            return res.status(201).json({
                status:false,
                message:err.message,

            })
        }

    }


    async dashboard(req,res){
        try{
            return res.status(200).json({
                status:true,
                message:'welcome to User dashboard',
                data:req.user
               
            })
        }catch(err){
            return res.status(201).json({
                status:false,
                message:err.message,
            })
        }

}
}


module.exports=new AuthController();