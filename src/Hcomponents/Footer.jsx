import react from "react";
function Footer() {
    return (<footer style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <p style={{color:"gray"}}><img src="../logo.png" alt="logo" style={{width:"40px",marginRight:"20px"}}/>For the curious(©{new Date().getFullYear()}).</p>
    </footer>);
};
export default Footer;
