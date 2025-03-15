import React, { useEffect } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
function Nav()
{
  const naveg=useNavigate();
  useEffect(()=>{
   $(".navbar-toggler").css({"border":"2px solid white","boxShadow":"none"});
  },[])
    return(<nav className="navback"style={{overflow:"hidden",zIndex:"200"}}>
       <nav className="navbar navbar-expand-lg" style={{padding:0}}>
  <div className="container-fluid" style={{backgroundColor:"#1f1f1f",padding:"10px",color:"white",borderRadius:"20px"}}>
    <a className="navbar-brand" href="/" style={{color:"white",marginRight:"80px"}}><img className="navlogo" src="../../logo.png" alt="Intellivibe" />IntelliVibe-AI</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{color:"white"}}>
      <i className="ion-grid"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav navul">
        <li className="nav-item">
          <a className="nav-link active hnavhm" aria-current="page" href="/api" style={{color:"white"}}>API KEY</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>{
              naveg("/api/Docs")
          }} href="#">DOCS.</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#PowerPlane">PRICING</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#DesktopApp">DESKTOP APK</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </nav>);
};
export default Nav;