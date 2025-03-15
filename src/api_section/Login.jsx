import React from "react";
function Login() {

 
  return (
   <div style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#1f1f1f",padding:"20px 25px 40px"}}>
     <form className="form loginform"  method="post">
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input name="password" type="password" className="form-control password" id="exampleInputPassword1"required />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
        <label className="form-check-label" for="exampleCheck1">agree that free API not for commercial use</label>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <a  href="#"  className="btn btn-primary signupbtn">SignUp</a>
     <div className="forma">
     <a id="resetpassword" href="#">forgot password</a>
     </div>
    </form>
   </div>
  );
};
export default Login;