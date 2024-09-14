import { createBrowserRouter } from "react-router-dom";
import Authentication from "./views/Authentication";
import Home from "./views/home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication/>,
    },
    {
        path:'/home',
        element: <Home/>
    }

]);

export default router;
