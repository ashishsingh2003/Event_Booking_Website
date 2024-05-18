const mongoose =require('mongoose');
const passportlocalmong=require('passport-local-mongoose');
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    
    
})
userschema.plugin(passportlocalmong);
const User=mongoose.model('User',userschema);
module.exports=User;