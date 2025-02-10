import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/login";
import Profile from "../Pages/Profile";
import History from "../Pages/History";
import AnnouncementForm from "../Pages/AnnouncementForm";
import Register from "../Pages/Register";
import Comments from "../Pages/Comments";
import Tutorial from "../Pages/Tutorial";
import Payments from "../Pages/Payments";
import Broadband from "../Pages/Broadband";
import Complain from "../Pages/Complain";
import ContactUsPage from "../Pages/ContactUsPage";
import Announcements from "../Pages/Announcements"
import ForgetPassword from "../Pages/ForgetPassword";
import ForgetPasswordSuccess from "../Pages/PasswordResetSuccess";
import UpdateProfile from "../Pages/UpdateProfile";
import ChangePassword from "../Pages/ChangePassword";


const Routes = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout></MainLayout>,
    children:[
      {
      path:"/",
      element:<Home></Home>,
    },{
      path:"/Home",
      element:<Home></Home>,
    },
    {
      path: "/announcements",
      element: <Announcements></Announcements>,
      loader: () =>
        fetch(
          "http://127.0.0.1:8000/api/announcements/?format=json"
        ),
    },
    {
      path:"/login",
      element:<Login></Login>,      
    },
    {
      path:"/profile",
      element:<Profile></Profile>,      
    },
    {
      path:"/History",
      element:<History></History>,      
    },
    {
      path: "/announcement-form",
      element: <AnnouncementForm></AnnouncementForm>,
    },
    {
      path: "/complains",
      element: <Complain></Complain>,
    },
    {
      path: "/contact",
      element: <ContactUsPage></ContactUsPage>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/comments",
      element: <Comments></Comments>,
    },
    {
      path: "/tutorials",
      element: <Tutorial />,
    },
    {
      path: "/payments",
      element: <Payments />,
    },
    {
      path: "/broadband",
      element: <Broadband />,
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/password-reset-success",
      element: <ForgetPasswordSuccess/>,
    },
    {
      path: "/update_profile",
      element: <UpdateProfile />,
    },
    {
      path: "/change_password",
      element: <ChangePassword />,
    },


    ]
  }
]);

export default Routes;
