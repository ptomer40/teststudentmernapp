import React, { useState } from 'react'

function StudentAdmin() {
    const [studentData,setStudentData]=useState([]);
    const token = localStorage.getItem("token");
      if(!token){
        return alert("Not a valid user to access this resource or no valid token ");
      }
    async function showData(e){
        e.preventDefault();
        const sid=e.target.sid.value;
    //alert("hiiiii"+sid);
if(sid=='*'){
    //https://teststudentmernapp-backend.onrender.com/api <-render
    const response=await fetch("http://localhost:3005/api/admin/show",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,  // Add token to Authorization header
        }
    });
            
    const res=await response.json();
    console.log(res.msg);
   
    if(!Array.isArray(res.msg)){
        //console.log(res.msg);
        return alert(res.msg);
    }  else{
    setStudentData(res.msg);    
    }      
    
}
else{
    const response=await fetch(`http://localhost:3005/api/admin/showByEmailId/${sid}`);
    const res=await response.json();
    console.log(res.msg);
    setStudentData(Array.isArray(res.msg)?res.msg:[res.msg]);
   }
}

async function deleteStudent(email){
//alert(email);
const response=await fetch(`http://localhost:3005/api/admin/deleteByEmailId/${email}`,{
    method:'DELETE'
});
    const res=await response.json();
    alert(res.msg);

}
async function updateStudent(email){
    alert('inside update');
    const newName=prompt('Enter Name to update');
   //https://teststudentmernapp-backend.onrender.com
    const response=await fetch(`http://localhost:3005/api/admin/updateByEmailId/${email}`,{
        method:'PATCH',
        body:JSON.stringify({newName}),
        headers:{'content-type':'application/json'}
    });
        const res=await response.json();
        alert(res.msg);
}
  return (
   <div>
    <div style={{backgroundColor:'brown',color:'white',fontSize:'25px', margin:'20px'}}>StudentAdmin</div>
    <form onSubmit={showData}>
    <div>
        <input type='text' name='sid' placeholder='Enter * or Student Id' required />
    </div>
    <div>
        <button>Serach Student</button>
    </div>
    </form>
    <div>
        {
        studentData && studentData.length>0?
        (<table border={2}>
         <thead>
            <t><td>Name</td><td>Email</td></t>
         </thead>
         <tbody>
            {studentData.map((student,index)=>(
                <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td><button onClick={()=>deleteStudent(student.email)}>Delete</button></td>
                    <td><button onClick={()=>updateStudent(student.email)}>Update</button></td>
                    </tr>
            ))}
         </tbody>
        </table>):
        (<h2>No student availabe</h2>)
        }

    </div>
    </div>
  )
}

export default StudentAdmin