const CsvUser=require('../model/csvuser')
const csv=require('csvtojson')
const { name } = require('ejs')
const path=require('path')

class CsvController{
    async csvcreate(req,res){
        try{
            const userData=[]
            csv().fromFile(req.file.path)
            .then(async(response)=>{
                for(let i=0;i<response.length; i++){
                    userData.push({
                        name:response[i].name,
                        email:response[i].email,
                        mobile:response[i].mobile,
                    })
                }
                const datas=await CsvUser.insertMany(userData)

                return res.status(201).json({
                    message:"csv data inserted successfully",
                    data:datas
                })
            })

        }catch(error){
            console.log(error)

        }


    }
}



module.exports=new CsvController();