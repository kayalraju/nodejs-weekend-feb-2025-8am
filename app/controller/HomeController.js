


class HomeController {

    async home(req,res){
        try{
            res.send('home page')

        }catch(e){
            console.log(e)
        }

    }
}


module.exports=new HomeController();