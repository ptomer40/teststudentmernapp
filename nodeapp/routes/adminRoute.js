const dbconn=require('../database/dbConn');
const express=require('express');
const cors=require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const student=require('../model/student')
const verifyToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware');


//protected route to access admin
router.get("/admin/validate",verifyToken,authorizeRoles('admin'), async(req,res,next)=>{
try{
     console.log("Inside /addmin/validate backend");
    res.status(200).json({ msg: "Authorized" });
    
}catch(err){
 res.status(403).json({ success: false, msg: "Access Denied" });
}
})


router.get("/admin/show",verifyToken,authorizeRoles('admin'),async(req,res)=>{
    try{
     console.log("")
    const sdata= await student.find();
    if (!sdata || sdata.length === 0) {
        return res.status(404).json({ msg: 'No students found' });
      }
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