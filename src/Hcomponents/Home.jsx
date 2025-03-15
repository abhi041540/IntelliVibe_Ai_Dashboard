import React from "react";
import Nav from "./Nav";
import Hsection1 from "./Hsection1";
import Hsection2 from "./Hsection2";
import Hsection3 from "./Hsection3";
import Hsection4 from "./Hsection4";
import Footer from "./Footer";
const surl = "https://intellivibe-ai-dashboard-server.onrender.com"

function Home() {
    return (<div style={{ backgroundColor: "#1f1f1f", overflowX: "hidden" }}>
        <Nav />
        <Hsection1 />
        <div className="hmaininfo" style={{ zIndex: "100", position: "relative" }}>
            <Hsection2 />
            <Hsection3 />
            <Hsection4 />
            <Footer />
        </div>
    </div>);
};
export default Home;
export { surl };