import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//  PAGES
import OpenRoom from "./pages/OpenRoom/OpenRoom";
import CreateARoom from "./pages/CreateARoom/CreateARoom";
import Room from "./pages/WaitingRoom/WaitingRoom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Signup from "./pages/Signup/Signup.page";
//  TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Default url axios
axios.defaults.baseURL = "http://localhost:3001/api/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/newroom",
        element: <OpenRoom />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/createroom",
        element: <CreateARoom />,
      },
      {
        path: "/room",
        element: <Room />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
