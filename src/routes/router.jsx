import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Layout from "../Layout/Layout";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Order from "../pages/admin/Order";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import Category from "../pages/admin/Category";
import Card from "../pages/user/Card";
import User from "../pages/admin/User";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout"
import UserDashboard from "../pages/user/UserDashboard";




const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            {
                path: "/", element: <Home />,
            },
            {
                path: "/card", element: <Card />,
            },
            {
                path: "/*", element: <NotFound />,
            },
            {
                path: "/contact", element: <Contact />,
            },
            {
                path: "/sign-in2024", element: <Login />,
            },
            
            // ------------user--------------
            // {
            //     path: "/customer/account", element: <UserLayout />, children: [
            //         { path: "", element: <UserDashboard/> },

            //     ],
            // }


        ]
    },

    //------------------------- For Admin  ------------------------------------------------------------

    {
        path: "/aameraaadmin2024", element: <AdminLayout />, children: [
            { path: "", element: <Dashboard /> },
            { path: "order", element: <Order /> },
            { path: "product", element: <Product /> },
            { path: "category", element: <Category /> },
            { path: "users", element: <User /> },
        ],
    },

])

export default router;