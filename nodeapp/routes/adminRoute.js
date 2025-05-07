const dbconn=require('../database/dbConn');
const express=require('express');
const cors=require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const student=require('../model/student')


router.get("/admin/show",async(req,res)=>{
    try{

    const sdata= await student.find();
res.json({msg:sdata})
    }catch(err){
        res.json({msg:err.message})
    }
})

router.get("/admin/showByEmailId/:email",async (req,res)=>{
    try{
    //let arr=[];
    const emailid=req.params.email;
    const data=await student.findOne({email:emailid});
    if(!data){
        res.json({msg:"email id not found in database"})
    }else{
    res.json({msg:data});
    }
   
     }catch(err){
        res.status(500).json({msg:err.message})
     }
})

router.delete("/admin/deleteByEmailId/:email",async(req,res)=>{
const emailid=req.params.email;
console.log(emailid)
const data=await student.deleteOne({email:emailid})
if(data.deletedCount==0){
    res.json({msg:"Data could not delete"})
}
res.json({msg:"Data deleted successfully!!!"})


})

router.patch("/admin/updateByEmailId/:email",async(req,res)=>{
    console.log('inside update')
   
    const emailid=req.params.email;
    const {newName}=req.body;
    console.log(newName)
   const data= await student.updateOne({email:emailid},{$set:{name:newName}});
   if(data.matchedCount==0){
    return res.status(404).send({ msg: "Student not found." });
   } 
   res.json({msg:"data updated successfully!!!"});
})

module.exports=router;