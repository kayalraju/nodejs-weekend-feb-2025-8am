
const {UserModel, UserSchemaValidation}=require('../model/user')

class HomeController {

    //for joi validate api

    async joivalidate(req,res){
        const data={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        }
        const {error,value}=UserSchemaValidation.validate(data)
        if(error){
            return res.status(401).json({
                message:error.details[0].message
            })
        }else{
            const usr=await UserModel.create(value)
            return res.status(200).json({
                message:'User Created Successfully',
                data:usr
            })
        }

    }






    async home(req,res){
        try{
            const data=await UserModel.find()
            const message=req.flash('message')
            res.render('home',{
                title:'Home Page',
                data:data,
                message
            })

        }catch(e){
            console.log(e)
        }
    }
    async addView(req,res){
        try{
            res.render('adduser',{
                title:'add Page'
            })

        }catch(e){
            console.log(e)
        }

    }

    async createUser(req,res){
       
        try{
            const {name,email,phone}=req.body
            const user=new UserModel({
                name,
                email,
                phone
            })
           const data= await UserModel.save()
           console.log('user',data);
           
           if(data){
            req.flash('message','user created successfully')
            res.redirect('/')
           }else{
            req.flash('message','user not created')
            res.redirect('/add')
           }
        }catch(error){
            res.redirect('/add')
            
        }

    }


    async editUser(req,res){
        try{
            const id=req.params.id
            const data=await UserModel.findById(id)
            res.render('update',{
                title:'edit Page',
                data:data
                
            })
            
        }catch(error){
            console.log(error);
            
            
        }

    }
    async updateUser(req,res){
        try{
            const id=req.params.id
            const {name,email,phone}=req.body
            const data=await UserModel.findByIdAndUpdate(id,{
                name,
                email,
                phone
            })
           if(data){
                req.flash('message','user updated successfully')
                res.redirect('/')
            }else{
                req.flash('message','user not updated')
                res.redirect('/edit/user/'+id)
            }
            
        }catch(error){
            console.log(error);
            
            
        }

    }
    async deleteUser(req,res){
        try{
            const id=req.params.id
           const data=await UserModel.findByIdAndDelete(id)
           if(data){
                req.flash('message','user delete successfully')
                res.redirect('/')
            }else{
                req.flash('message','user not delete')
                res.redirect('/')
            }
            
        }catch(error){
            console.log(error);
            
            
        }

    }


}


module.exports=new HomeController();