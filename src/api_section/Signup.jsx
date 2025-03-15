import React from "react";
function Signup() {
  return (
   <div style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#1f1f1f",padding:"20px 25px 40px"}}>
     <form className="form signupform">
     <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Name</label>
        <input type="text" name="name" className="form-control"  aria-describedby="emailHelp" required/>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name="email" className="form-control" aria-describedby="emailHelp" required/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" name="password" className="form-control" required />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Confirm password</label>
        <input type="password" name="confpassword" className="form-control"  required/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" required/>
        <label className="form-check-label" for="exampleCheck1">agree that free API not for commercial use</label>
      </div>
      <button type="submit" className="btn btn-primary">Continuoue</button>
      <a  href="#" className="btn btn-primary signupback">Back</a>
    </form>
   </div>
  );
};
export default Signup;