const express=require('express');
const cors=require('cors');
const fs=require('fs').promises;
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

app.post("/register",async(req,res)=>{
    let arr=[];
const {name,email,password}=req.body;
const data1=await fs.readFile('student.json',{encoding:'utf-8'});
                arr=JSON.parse(data1);

                const result=arr.find(ele=>ele.email==email);
               console.log(result);
               if(result){
                console.log("Inside statue true");
                
                return res.json({msg:"Email is already registerd"})
               }
         else{
               arr.push({name,email,password});
               console.log(arr);
           await fs.writeFile('student.json',JSON.stringify(arr,null,2));
           res.json({msg:"Registration done successfully!!!"});
         }

})


app.post("/login",async(req,res)=>{
let arr=[];
    const {email,password}=req.body;
    console.log(email+password);
    const data1=await fs.readFile('student.json',{encoding:'utf-8'});
       arr=JSON.parse(data1);
       const result=arr.find(ele=>ele.email==email && ele.password==password);
       if(result){
        
        res.json({msg:"success"});
       }
       else{
        
        res.json({msg:"user is invalid, email or password is incorrect"});
       }


})
app.get("/admin/show",async(req,res)=>{
    try{
const data=await fs.readFile('student.json',{encoding:'utf-8'});
      const sdata= JSON.parse(data);
      res.json({msg:sdata})
    }catch(err){
        res.json({msg:err.message})
    }
})

app.get("/admin/showByEmailId/:email",async (req,res)=>{
    try{
    let arr=[];
    const emailid=req.params.email;
    //console.log(emailid);
    const data=await fs.readFile('student.json',{encoding:'utf-8'});
    arr=JSON.parse(data);
    const result=arr.find(ele=>ele.email==emailid)
    if(!result){
        res.json({msg:"email id not found in database"})
    }
        res.json({msg:result});
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

app.delete("/admin/deleteByEmailId/:email",async(req,res)=>{
const emailid=req.params.email;
console.log(emailid)
let arr=[];
           const data=await fs.readFile('student.json',{encoding:'utf-8'});
           arr=JSON.parse(data);
           const index=arr.findIndex(ele=>ele.email==emailid);
           if(index==-1){
            res.json({msg:"emaild is not found in database"})
           }
           arr.splice(index,1);
           await fs.writeFile('student.json',JSON.stringify(arr,null,2));
           res.json({msg:"data deleted successfully!!!"})
})

app.listen(port,()=>{
    console.log("Express srver is running on::"+port)
})