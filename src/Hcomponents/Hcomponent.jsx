import react from "react";
function Hcomponent(param) {
    return (
        <div className="hcomponent" style={{display:"inline-block"}}>
            <div className="card"style={{width: "16rem",padding:"20px",backgroundColor:"rgb(33, 30, 30)",color:"white"}}>
                <img src={param.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:"110%"}}><img src="../images/imlogo.jpg" alt="AI"style={{width:"40px",marginRight:"8px"}}/>{param.title}</h5>
                    <p className="card-text" style={{fontSize:"70%"}}>{param.text}</p>
                   <div style={{textAlign:"center",marginTop:"20px"}}>
                   <a href="/chat" className="btn btn-primary" onMouseOver={(event)=>{event.target.style.background="linear-gradient(45deg, #363636, #141313)"; event.target.style.border="1px solid gray"}} onMouseOut={(event)=>{event.target.style.background="linear-gradient(45deg, #0b284b,#242424)"; event.target.style.border="1px solid blue"}} style={{padding:"4px 15px",fontSize:"90%",background:"linear-gradient(45deg, #0b284b,#242424)"}}>Explore</a>
                   </div>
                </div>
            </div>
        </div>
    );
};
export default Hcomponent;