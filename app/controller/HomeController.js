const { name } = require("ejs");

class HomeController {

    async home(req,res){
        try{
            res.render('home',{
                title:'Home Page'
            })

        }catch(e){
            console.log(e)
        }

    }

    async About(req,res){
        try{
            const user={
                name:'Shahin',
                age:22,
                email:'shahin@gmail.com'
            }
            res.render('about',{
                title:'About Page',
                data:user
            })

        }catch(error){
            console.log(error);
            
        }

    }
}


module.exports=new HomeController();