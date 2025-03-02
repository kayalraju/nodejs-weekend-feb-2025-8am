const User = require('../model/user')  

class HomeController {

    async home(req,res){
        try{
            const data=await User.find()
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
            const user=new User({
                name,
                email,
                phone
            })
           const data= await user.save()
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
            const data=await User.findById(id)
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
            const data=await User.findByIdAndUpdate(id,{
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
           const data=await User.findByIdAndDelete(id)
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