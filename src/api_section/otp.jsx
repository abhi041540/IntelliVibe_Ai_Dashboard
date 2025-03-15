import react from "react";
function Otp()
{
    return(
        <div className="otpverify" style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0%",left:"0%",backgroundColor:"transparent",width:"100%"}}>
            <div className="container px-4 text-center otp">
        <div className="row gx-5">
          <div className="col">
           <div className="p-3">Email OTP</div>
           <form className="otpform" method="post">
           <input style={{boxShadow:"none"}} type="password" name="otp" required class="form-control" aria-describedby="passwordHelpInline" placeholder="Enter OTP"/>
            <button className="otpbtn" type="submit">Submit</button>
           </form>
          </div>
        </div>
      </div>
        </div>
    );
};
export default Otp;