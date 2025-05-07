const dbconn=require('../database/dbConn');
const express=require('express');
const cors=require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const student=require('../model/student')

router.post("/register",async(req,res)=>{
    try{
  const {name,email,password,role}=req.body;
  const existingUser = await student.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists with this email." });
  }
   const hashedPassword=await bcrypt.hash(password,10);
  const newUser= await student.create({
      name,
      email,
      password:hashedPassword,
      role
  })
  //await student.create(studentdata);
  res.json({msg:"Registration done successfully!!!"});
    }catch(err){
      res.json({msg:err.message});
    }
  })
  
  
  router.post("/login",async(req,res)=>{
  let arr=[];
      const {email,password}=req.body;
      console.log(email+password);
    const studentData=await student.findOne({email:email});
    //console.log(studentData)
    if(!studentData){
      res.json({msg:"user is not registered"});
    }else{
      const ismatched=bcrypt.compare(password,studentData.password)
      if(ismatched){
          console.log("JWT_SECRET:", process.env.JWT_SECRET);
          const token = jwt.sign(
              { id: studentData._id, role: studentData.role },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN }
            );
          res.json({msg:"success",token,
              user: {
                id: studentData._id,
                name: studentData.name,
                email: studentData.email,
                role: studentData.role
              }});
      }else{
          res.json({msg:"password is incorrect"}); 
      }
    }
     
   
  })
  module.exports = router;