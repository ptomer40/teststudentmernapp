const express=require('express');
const cors=require('cors');
const fs=require('fs').promises;
const dbconn=require('./database/dbConn')
const student=require('./model/student')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const attendanceRoutes = require('./routes/attendanceRoutes');
const loginnregistrationRoutes=require('./routes/loginnregistrationRoutes');
const adminRoute=require('./routes/adminRoute');
const studentRouting=require('./routes/studentRouting');

dbconn();
const app=express();
const port=3005;
app.use(express.json());
app.use(cors()); //allow cross origin
app.get("/",(req,res)=>{
res.send("Welcome to Express Framework Server");
})

app.post("/msg",(req,res)=>{
    res.send("Hii, Hitting the /msg api");
})
app.use('/api', attendanceRoutes);
app.use('/api',loginnregistrationRoutes);
app.use('/api',adminRoute);
app.use('/api',studentRouting);





app.listen(port,()=>{
    console.log("Express srver is running on::"+port)
})