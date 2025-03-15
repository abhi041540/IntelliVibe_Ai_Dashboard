import react from "react";
import reactDom from"react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Hcomponents/Home.jsx";
import Chat from "./Chatcomponent/Chat.jsx";
import Speak from "./Chatcomponent/Speak.jsx";
import Api from "./api_section/Api.jsx";
import DocumentationPage from "./docs/DocumentationPage.jsx";
const routs=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/chat",
        element:<Chat/>
    },
    {
        path:"/voiceassist",
        element:<Speak/>
    },
    {
        path:"/api",
        element:<Api/>
    },
    {
        path:"/api/Docs",
        element:<DocumentationPage/>
    }
])
const root=reactDom.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={routs}/>
)