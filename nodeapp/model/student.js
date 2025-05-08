const mongoose=require('mongoose');

      const studentSchema= new mongoose.Schema({
        sid:{type:String,required:true,unique:true},
        name:{type:String,required:true},
        branch:{type:String,required:true},
        section:{type:String,required:true},
        email:{type:String, required:true,unique:true},
        password:{type:String,required:true},
        role:{
          type:String,
          enum:['student','teacher','admin'],
          default:'student'
        }
       },{timestamps:true})

       const student=mongoose.model('student',studentSchema);
       module.exports=student