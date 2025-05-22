import React from 'react'
import {useNavigate} from 'react-router-dom'
function Login() {

  const navigate=useNavigate();
  async function sendData(e){
    e.preventDefault();
       const email=e.target.email.value;
       const password=e.target.password.value;
       //alert(email+password);
      //  const response=await fetch("https://teststudentmernapp-backend.onrender.com/api/login",{
      //   method:"POST",
      //   body:JSON.stringify({email,password}),
      //   headers:{'Content-Type':'application/json'}
      //  })
      const response=await fetch("http://localhost:3005/api/login",{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'}
       })
      const res= await response.json();
      
      
      if(res.msg=="success" && res.user.role=="student"){
        
        localStorage.setItem("token", res.token);  
       localStorage.setItem("user", JSON.stringify(res.user));
       
       const vresponse=await fetch("http://localhost:3005/api/student/validate",{
        method:"GET",
        headers:{'Content-Type':'application/json', "authorization":`Bearer ${res.token}`}
       })
       console.log("After / student validate at react")

      const vres= await vresponse.json();
      console.log(vres);
      if(vres.msg=='Authorized'){
       navigate('/studentdashboard');
      }
      else{
        console.log("Inside student else Authorized")
        alert(vres.msg)
      }

         
      }
      
      else if(res.msg=="success" && res.user.role=="admin"){
       //console.log(res.token);
       localStorage.setItem("token", res.token);  
       localStorage.setItem("user", JSON.stringify(res.user));
       
       const vresponse=await fetch("http://localhost:3005/api/admin/validate",{
        method:"GET",
        headers:{'Content-Type':'application/json', "authorization":`Bearer ${res.token}`}
       })
       console.log("After /validate at react")

      const vres= await vresponse.json();
      console.log(vres);
      if(vres.msg=='Authorized'){
       navigate('/admindashboard');
      }
      else{
        console.log("Inside else Authorized")
        alert("hoooo:"+vres.msg)
      }
      }
      else if(res.msg=="success" && res.user.role=="teacher") {
        navigate('/teacherdashboard');
   }else{
    alert(res.msg);
   }
  }
  return (
    <div style={{height:'400px'}} >
  <h2 style={{backgroundColor:'#4d2234',color:'white'}}>Login</h2>
      
        <form onSubmit={sendData}>
      
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" required class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
 
  <button type="submit" class="btn btn-primary" style={{marginTop:'20px'}}>Submit</button>
</form>

        </div>

    

    
  )
}

export default Login