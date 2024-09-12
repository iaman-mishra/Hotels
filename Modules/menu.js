const mongoose=require("mongoose");

const menucard=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        require:true,
        enum:["sweet","spicy","sour"],
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    is_veg:{
        type:Boolean,
        required:true
    },
    ingredients:{
        type:[String],
        default:[]
    },
    sales:{
        type:Number,
        default:0
    }

})

const menuItem=mongoose.model("menuItems",menucard);
module.exports=menuItem;