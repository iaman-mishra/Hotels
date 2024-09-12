const express=require("express");
const router=express.Router();
const person=require("../Modules/person");



// Post method for person data
router.post("/", async (req,res)=>{
    try {
        const personData = req.body;    //assuming body contains teh data
        const personInstance = new person(personData); //creating new person
        const result = await personInstance.save(); //saving the person to the database
        console.log("Data is saved sucessfully");
        res.status(200).send(result); //returning the result to client

    } catch (error) {
        console.log("Error while saving data", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})



// Get method for fetching persons data
router.get("/",async (req,res)=>{
    try {
        const data=await person.find();
        console.log("Data is fetched sucessfully");
        res.status(200).send(data);
    } catch (error) {
        console.log( "Error while fetching data",error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})




// Parmetrized get method for person data fetching
router.get("/:workType",async (req,res)=>{
    try {
        const workt = req.params.workType;
        if(workt=='shef' || workt=='user' || workt=='manager' || workt=='waiter'){
            const result= await person.find({work:workt});
            console.log(`All ${workt} data fetched sucessfully`);
            res.status(200).send(result);
        }
        else{
            console.log("Invalid user type");
            res.status(404).send({message:"Client request error"});
        }
    } catch (error) {
        console.log( "Error while fetching data",error);
        res.status(500).send({ message: "Internal Server Error" });
        
    }
})


router.put("/:id",async (req,res)=>{
    try { 
        const id=req.params.id;         //extracting id where to change
        const updatedData= req.body;    //extracting updated data
        const result = await person.findByIdAndUpdate(id,updatedData,{
            new:true, //return updated data
            runValidators:true //validate data before update
        });
        if(!result){
            console.log("No data found");
            res.status(404).send({message:"Person not found"});
        }
        console.log("Data sucessfully updated");
        res.status(200).send(result);

    } catch (error) {
        console.log( "Error while fetching data",error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})


router.delete("/:id",async (req,res)=>{
    try {
        const id=req.params.id;
        const result = await person.findByIdAndDelete(id);
        if(!result){
            console.log("No data found");
            res.status(404).send({message:"Person not found"});
        }
        console.log("Person deleted sucessfully");
        res.status(200).send(result);
        

    } catch (error) {
        console.log( "Error while fetching data",error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})



module.exports=router;