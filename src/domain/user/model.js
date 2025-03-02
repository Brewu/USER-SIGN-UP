const {mongoose } = require('mongoose')
const monggoose=require('mongoose')

const Schema=mongoose.Schema

const UserSchma=new Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
    token:String
})
const User=monggoose.model("User", UserSchma)
module.exports=User