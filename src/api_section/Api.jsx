import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import $ from "jquery";
import { surl } from "../Hcomponents/Home";
import axios from "axios";
import Otp from "./otp";
import ChangePassword from "./ChangePassword";
function Api() {
    const otpvalue = useRef("");
    var [part, setPart] = useState(1);
    const email1 = useRef("");
    const password1 = useRef("");
    const email2 = useRef("");
    const password2 = useRef("");
    const otpt = useRef(1);
    const name1 = useRef("");
    const apk = useRef("");
    useEffect(() => {
        $(".signupbtn").on("click", () => {
            setPart(2);
        });
        $(".signupback").on("click", () => {
            setPart(1);
        });
        $("#resetpassword").click(()=>{
            setPart(4);
        })
        $(".loginform").on("submit", (event) => {

            event.preventDefault();
            axios.put(surl + "/login/api", { email: event.target.elements["email"].value, password: event.target.elements["password"].value }).then((resp) => {
                if (resp.data !== "No User Found!") {
                    apk.current=resp.data;
                    setPart(3);
                }
                else {
                    alert(resp.data);
                }
                event.target.elements["email"].value = null;
                event.target.elements["password"].value = null;
            });

        });

        $(".signupform").on("submit", (event) => {

            event.preventDefault();
            otpt.current=1;
            const name = event.target.elements["name"].value;
            const email = event.target.elements["email"].value;
            const password = event.target.elements["password"].value;
            const confpass = event.target.elements["confpassword"].value;
            email1.current = event.target.elements["email"].value;
            password1.current = event.target.elements["password"].value;
            name1.current = event.target.elements["name"].value;
            const otp = String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9));
            otpvalue.current = otp;
            if (password === confpass) {
                $(".otpverify").css({ "visibility": "visible" });
                axios.post(`${surl}/signup/api/email`, { email: email, name: name, otp: otpvalue.current }).then((resp) => {
                    if (resp.data == "otp sent") {

                        event.target.elements["name"].value = null;
                        event.target.elements["email"].value = null;
                        event.target.elements["password"].value = null;
                        event.target.elements["confpassword"].value = null;

                    }
                    else {
                        alert(resp.data);
                        $(".otpverify").css({ "visibility": "hidden" });
                        event.target.elements["name"].value = null;
                        event.target.elements["email"].value = null;
                        event.target.elements["password"].value = null;
                        event.target.elements["confpassword"].value = null;
                    }
                });
            }
            else {
                alert("Password And Confirm password Not Matched Try Again");
                event.target.elements["name"].value = null;
                event.target.elements["email"].value = null;
                event.target.elements["password"].value = null;
                event.target.elements["confpassword"].value = null;
            }
            event.target.elements["name"].value = null;
            event.target.elements["email"].value = null;
            event.target.elements["password"].value = null;
            event.target.elements["confpassword"].value = null;

        });
$(".changeform").on("submit", (event) => {

            event.preventDefault();

          otpt.current=2;
            const email = event.target.elements["email"].value;
            const password = event.target.elements["password"].value;
            const confpass = event.target.elements["confpassword"].value;
            email2.current = event.target.elements["email"].value;
            password2.current = event.target.elements["password"].value;
            const otp = String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9)) + String(Math.ceil(Math.random() * 9));
            otpvalue.current = otp;
            if (password === confpass) {
                $(".otpverify").css({ "visibility": "visible" });
                axios.post(`${surl}/change/api/email`, { email: email, otp: otpvalue.current }).then((resp) => {
                    if (resp.data == "otp sent") {

                        event.target.elements["email"].value = null;
                        event.target.elements["password"].value = null;
                        event.target.elements["confpassword"].value = null;

                    }
                    else {
                        alert(resp.data);
                        $(".otpverify").css({ "visibility": "hidden" });
                        event.target.elements["email"].value = null;
                        event.target.elements["password"].value = null;
                        event.target.elements["confpassword"].value = null;
                    }
                });
            }
            else {
                alert("Password And Confirm password Not Matched Try Again");
                event.target.elements["email"].value = null;
                event.target.elements["password"].value = null;
                event.target.elements["confpassword"].value = null;
            }
            event.target.elements["email"].value = null;
            event.target.elements["password"].value = null;
            event.target.elements["confpassword"].value = null;

        });

        $(".otpform").on("submit", (event) => {
            event.preventDefault();
            const otp = event.target.elements["otp"].value;
            if(otpt.current==1)
            {
                if (otp == otpvalue.current) {
                    //   console.log("yes");
                    axios.post(`${surl}/signup/savedata`, { email: email1.current, password: password1.current, name: name1.current,type:1}).then((resp) => {
                        alert(resp.data);
                        event.target.elements["otp"].value = null;
                        $(".otpverify").css({ "visibility": "hidden" });
                        if (resp.data == "Signup Successfully") {
                            $(".otpverify").css({ "visibility": "hidden" });
                            setPart(1);
                        }
                    });
                }
                else {
                    alert("SignUp Failed!");
                    event.target.elements["otp"].value = null;
                    $(".otpverify").css({ "visibility": "hidden" });
                }
            }
            else
            {
                if (otp == otpvalue.current) {
                    //   console.log("yes");
                    axios.post(`${surl}/signup/savedata`, { email: email2.current, password: password2.current,type:2}).then((resp) => {
                        alert(resp.data);
                        event.target.elements["otp"].value = null;
                        $(".otpverify").css({ "visibility": "hidden" });
                        if (resp.data == "Signup Successfully") {
                            $(".otpverify").css({ "visibility": "hidden" });
                            setPart(1);
                        }
                    });
                }
                else {
                    alert("SignUp Failed!");
                    event.target.elements["otp"].value = null;
                    $(".otpverify").css({ "visibility": "hidden" });
                }
            }
        });
    }, [part]);
    if (part == 1) {
        return (
            <div className="apisection">
                <h2 style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", fontSize: "95%", margin: 0 }}><img src="../../logo.png" alt="logo" style={{ width: "40px", marginRight: "10px" }} />IntelliVibe AI</h2>
                <div style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "135%", fontFamily: "serif" }}>Login to Continue</h3>
                </div>
                <Login />
            </div>
        );
    }
    else if (part == 2) {
        return (
            <div className="apisection">
                <h2 style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", fontSize: "95%", margin: 0 }}><img src="../../logo.png" alt="logo" style={{ width: "40px", marginRight: "10px" }} />IntelliVibe AI</h2>
                <div style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "135%", fontFamily: "serif" }}>Signup to Continue</h3>
                </div>
                <Signup />
                <Otp />
            </div>
        );
    }
    else if(part==4)
    {
        return (
            <div className="apisection">
                <h2 style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", fontSize: "95%", margin: 0 }}><img src="../../logo.png" alt="logo" style={{ width: "40px", marginRight: "10px" }} />IntelliVibe AI</h2>
                <div style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "135%", fontFamily: "serif" }}>Change Your Password</h3>
                </div>
                <ChangePassword/>
                <Otp/>
            </div>
        );
    }
    else {
        return (
            <div className="apisection">
                <h2 style={{ backgroundColor: "#1f1f1f", padding: "0", padding: "10px", fontSize: "95%", position: "fixed", top: 0, left: "0", right: 0 }}><img src="../../logo.png" alt="logo" style={{ width: "40px", marginRight: "10px" }} />IntelliVibe AI</h2>
                <div style={{backgroundColor:"#1f1f1f",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"60px",height:"80vh"}}>
                <div class="container px-1 text-center"style={{backgroundColor:"gray",margin:"0 20px",maxWidth:"650px",border:"1px solid white",borderRadius:"20px",position:"relative",background:"linear-gradient(45deg,gray,#1f1f1f)"}}>
                    <div class="row">
                        <div class="col">
                            <div class="p-3">
                                <img src="../../logo.png" alt="logo" style={{width:"40px",position:"absolute",top:"2%",right:"2%",margin:"10px 5px 0 0"}}/>
                                <h2 style={{textAlign:"left",fontFamily:"serif",fontSize:"100%",marginTop:"40px"}}>YOUR API KEY :</h2>
                               <input type="text" value={apk.current} style={{width:"98%",padding:"8px",backgroundColor:"gray"}} />
                               <h2 style={{fontSize:"106%",margin:"20px",color:"white",backgroundColor:"#333131",padding:"10px",textShadow:"10px 10px 10px black"}}>Not for commercial uses</h2>
                               <h4 style={{fontSize:"95%"}}>Keep it secure</h4>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
               
            </div>
        );
    }

};
export default Api;
