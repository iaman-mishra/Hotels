const express=require("express");
const router=express.Router();
const menuItem=require("../Modules/menu");

router.post("/",async (req,res)=>{
    try {
        const data=req.body;
        const menuInstance=new menuItem(data);
        const result=await menuInstance.save();
        console.log("New Item Listed Sucessfully");
        res.status(200).send(result);
        
    } catch (error) {
        console.log("Error while saving dara",error);
        res.status(500).send({message:"Internal server Error"});
    }
})



router.get("/",async (req,res)=>{
    try {
        const result=await menuItem.find();
        console.log("Data is fetched sucessfully");
        res.status(200).send(result);
    } catch (error) {
        console.log("Error while fetching data",error);
        res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports=router;