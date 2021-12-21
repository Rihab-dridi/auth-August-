//require mongoose 
const mongoose=require('mongoose')
//require the schema 
const schema=mongoose.Schema

//create the schema 

const userSchema= new schema({
    userName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true 
    },
    role:{
        type:String,
        default:'user'
    }
})
//create the model+ export the model 
module.exports=User=mongoose.model('User', userSchema)
