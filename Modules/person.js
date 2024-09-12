const mongoose=require("mongoose");

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:0,
        max:150
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    work:{
        type:String,
        enum:["shef","manager","waiter","user"],
        required:true,
        default:"user"
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
})

const person =mongoose.model("person",personSchema);
module.exports=person; 