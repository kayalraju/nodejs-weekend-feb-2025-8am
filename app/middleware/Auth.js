
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const hashedPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password,salt);
    return hashed;
}

const comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

const AuthCheck=async(req,res,next)=>{
    const token=req.body.token||req.query.token||req.headers['x-access-token']||req.headers['authorization'];
    if(!token){
        return res.status(400).json({
            status:false,
            message:'Token is required for authentication'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        //console.log('afterlogin user',req.user);
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"invalid token"
        })
    }
    return next();
}




module.exports= {hashedPassword,comparePassword, AuthCheck};