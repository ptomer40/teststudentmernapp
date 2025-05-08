import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
function Registration() {
    async function sendData(e){
     e.preventDefault();
     const name=e.target.name.value;
     const email=e.target.email.value;
     const password=e.target.password.value;
     const sid=e.target.sid.value;
     const branch=e.target.branch.value;
     const section=e.target.section.value;

     alert(sid+branch+section+name+email+password);

        const response=await fetch("https://teststudentmernapp-backend.onrender.com/api/register",{
            method:"POST",
            body:JSON.stringify({name,email,password,sid,branch,section}),
            headers:{'Content-Type':'application/json'}
        })
        const res=await response.json();
        alert(res.msg);
    }
  return (



    <div className='container mt-5'>
      <div className='card shadow p-4'>
      <h2 style={{backgroundColor:'#03f4fc'}}>Registration</h2>
      </div>
      
        <div>
        <form onSubmit={sendData}>
        <div class="form-group">
    <label for="id">your id(admission number)</label>
    <input type="text" name="sid" required class="form-control" id="exampleInputname" aria-describedby="admission" placeholder="Enter admission number" />
   
  </div>
        <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" name="name" required class="form-control" id="exampleInputname" aria-describedby="emailHelp" placeholder="Enter name" />
   
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Branch</label>
   <select name='branch'>
    <option>CSE</option>
    <option>CS</option>
    <option>IT</option>
   </select>
   
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Section</label>
   <select name='section'>
    <option>A</option>
    <option>B</option>
    <option>C</option>
   </select>
   
  </div>
  
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" required class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

        </div>
    </div>
  )
}

export default Registration