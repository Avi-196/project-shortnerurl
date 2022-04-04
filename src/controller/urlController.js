const urlModel=require("../models/urlModel")
const shortid = require("shortid");
const validUrl = require('valid-url')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const isValidRequestBody = function (data) {
    return Object.keys(data).length > 0
  }


  const createShortUrl = async function (req, res) {
    try {
        const data = req.body

        if(!isValidRequestBody(data)){
            return res.status(404).send({status:false,msg:"your request is not found"})
        }

        if(!isValid(data.longUrl)){
            return res.status(400).send({status:false,msg:"please required longurl "})
        }

        if (!validUrl.isWebUri(data.longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please enter valid " })
        }

        data.urlCode = shortid.generate().toLowerCase()

        data.shortUrl = `http://localhost:3000/${data.urlCode}`

        const uniqueurl = await urlModel.findOne({ longUrl: data.longUrl })
        if (uniqueurl) {
            return res.status(400).send({ status:false,msg:"this url have already present" })
        }

        const createUrl = await urlModel.create(data)
            return res.status(201).send({status:true,msg:"sucessfullycreated",data:createUrl})
        
            
   
  

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
  }




  const getUrl=async function (req,res){
      try {
              
        let urlCode=req.params.urlCode
        if(!isValid(urlCode)){
            return res.status(400).send({status:false,msg:"please provide the urlcode"})
        }
        const URL=await urlModel.findOne({urlCode:urlCode})
        console.log(URL.longUrl)
        if(!URL){
            return res.status(400).send({status:false,msg:"not able to find"})
        }else{
            return res.status(301).redirect(URL.longUrl)
        }

          
      } catch (error) {
          return res.status(500).send({status:false,msg:error.message})
          
      }
  }



module.exports.createShortUrl=createShortUrl
module.exports.getUrl=getUrl