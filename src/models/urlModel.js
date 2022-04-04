const mongoose=require("mongoose")


const urlSchema=new mongoose.Schema({

longUrl:{
    type:String,
    Url:String,
    trim:true
},

shortUrl:{
    type:String,
    Url:String,
    required:true,
    unique:true

},

urlCode:{
    type:String,
    url:String,
    required:true,
    unique:true,
    lowercase:true,

},

},{timestamps:true})

module.exports=mongoose.model('Url',urlSchema)