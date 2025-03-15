import react from "react";
import Hcomponent from "./Hcomponent";
import data1 from "../content.js";
function Hsection2()
{
    return(
        <section className="hsection2">
         <h1>AI experiences:</h1>
        
            <div style={{maxWidth:"1104px",margin:"0 auto"}}>
            { 
            data1.map((x)=>(<Hcomponent image={x.image} text={x.text} title={x.title} />))
             }
            </div>
           
        </section>
    );
};
export default Hsection2;