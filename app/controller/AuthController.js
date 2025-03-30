const User=require('../model/user');
const { hashedPassword, comparePassword } = require('../middleware/Auth');
const jwt=require('jsonwebtoken');
const sendEmailVerificationOTP = require('../helper/emailVerify');
const EmailVerifyModel=require('../model/otpModel')

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
           const user= await userdata.save();
           sendEmailVerificationOTP(req,user)
           return res.status(201).json({
            status:true,
            message:'User register Succesfully and OTP send to your email please verify your email',
            data:user
        })

        }catch(err){
            return res.status(201).json({
                status:false,
                message:err.message,
              
            })
        }

    }


    async verify(req,res){
        try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await EmailVerifyModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmailVerificationOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await EmailVerifyModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
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
            if (!user.is_verified) {
                return res.status(401).json({ status: false, message: "Your account is not verified" });
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
                    _id:user._id,
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

    async updatePassword(req,res){
       //console.log(req.body);
       
       try {
        const user_id = req.body.user_id;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                message: 'Password is required'
            });
        }
        const userdata = await User.findOne({ _id: user_id });
        if (userdata) {
            const newPassword = await hashedPassword(password);
            const updateuser = await User.findOneAndUpdate({ _id: user_id },
                {
                    $set: {
                        password: newPassword
                    }
                });
            res.status(200).json({
                message: 'Password updated successfully',

            });
        } else {
            res.status(400).json({
                message: 'password not updated'
            });
        }

    } catch (err) {
        console.log(err);
    }

}


}


module.exports=new AuthController();