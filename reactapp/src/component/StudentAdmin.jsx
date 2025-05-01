import React, { useState } from 'react'

function StudentAdmin() {
    const [studentData,setStudentData]=useState([]);
    async function showData(e){
        e.preventDefault();
        const sid=e.target.sid.value;
    //alert("hiiiii"+sid);
if(sid=='*'){
    const response=await fetch("https://teststudentmernapp-backend.onrender.com/admin/show");
            const res=await response.json();
            console.log(res.msg);
            setStudentData(res.msg);
}
else{
    const response=await fetch(`https://teststudentmernapp-backend.onrender.com/admin/showByEmailId/${sid}`);
    const res=await response.json();
    console.log(res.msg);
    setStudentData(Array.isArray(res.msg)?res.msg:[res.msg]);
   }
}

async function deleteStudent(email){
//alert(email);
const response=await fetch(`https://teststudentmernapp-backend.onrender.com/admin/deleteByEmailId/${email}`,{
    method:'DELETE'
});
    const res=await response.json();
    alert(res.msg);

}
function updateStudent(){

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