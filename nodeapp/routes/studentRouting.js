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


router.get("/student/validate",verifyToken,authorizeRoles('student'), async(req,res,next)=>{
try{
     console.log("Inside /student/validate backend");
    res.status(200).json({ msg: "Authorized" });
    
}catch(err){
 res.status(403).json({ success: false, msg: "Access Denied" });
}
})
module.exports=router;