import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Registration/Signin";
import Signup from "../Pages/Registration/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'signin',
                element: <Signin />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    }
])

export default router;