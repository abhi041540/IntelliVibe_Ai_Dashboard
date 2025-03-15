import react from "react";
function Hsection4()
{
    return(
        <section className="hsection4" style={{color:"white"}}id="DesktopApp">
         <h1>Desktop App:</h1>
         <div class="container overflow-hidden text-center">
      <div class="row gx-5">
        <div class="col" style={{minWidth:"16rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
         <div class="p-3"><img src="../images/desktopapp.png" alt="DA" style={{width:"100%"}} /></div>
        </div>
        <div class="col" style={{display:"flex",justifyContent:"center",alignItems:"center",minWidth:"16rem"}}>
          <div>
          <div class="p-3" style={{textAlign:"center"}}>
            <h2 style={{marginBottom:"20px"}}>Desktop AI Experience</h2>
            <p style={{color:"rgb(182, 176, 176)"}}>
            Discover the power of our advanced AI through our meticulously crafted Java-based desktop application. With an easy-to-use interface and robust features, our application delivers a seamless AI experience straight to your desktop. Download the APK and enter a world of innovative AI solutions tailored for your needs.
            </p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <a href="#" onClick={()=>{
              alert("The APK is currently undergoing maintenance and will be available shortly!");
            }} className="btn btn-primary" onMouseOver={(event)=>{event.target.style.background="linear-gradient(45deg, #363636, #141313)"; event.target.style.border="1px solid gray"}} onMouseOut={(event)=>{event.target.style.background="linear-gradient(45deg, #0b284b,#242424)"; event.target.style.border="1px solid blue"}} style={{padding:"4px 15px",fontSize:"90%",background:"linear-gradient(45deg, #0b284b,#242424)",display:"block",border:"1px solid blue",width:"160px"}}>Download</a>    
            </div>      
          </div>
          </div>
        </div>
      </div>
    </div>
           
        </section>
    );
};
export default Hsection4;