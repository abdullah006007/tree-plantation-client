import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layout/RootLayout";
import ErrorElement from "../Shareed/ErrorElement";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Authentication/login/LogIn";
import Register from "../Authentication/register/Register";
import UpcmingEvent from "../Pages/UpcomingEvent/UpcmingEvent";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import CreateEvent from "../Dashboard/CreateEvent";
import JoinedEvents from "../Dashboard/JoinedEvents";
import ManageEvents from "../Dashboard/ManageEvents";
import EventDetails from "../Pages/UpcomingEvent/EventDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                Component: Home

            },
            {
                path:'upcoming-event',
                Component: UpcmingEvent
            },
            {
                path: "/event/:id",
                element: 
                <PrivateRoute>
                    <EventDetails></EventDetails>

                </PrivateRoute>


            },
            {
                path:'about',
                Component: About
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout/>,
        errorElement: <ErrorElement />,
        children: [
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },


    {
        path: "dashboard",
        element: (
            <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>
        ),
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path:'create-event',
                element: <PrivateRoute>
                    <CreateEvent></CreateEvent>                    
                </PrivateRoute>
            },
            {
                path:'join-event',
                element: 
                <PrivateRoute>
                    <JoinedEvents></JoinedEvents>                                     
                </PrivateRoute>
            },
            {
                path:'manage-event',
                element: <PrivateRoute>
                   <ManageEvents></ManageEvents>             
                </PrivateRoute>
            },
        ]
    }



])