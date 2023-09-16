import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//  PAGES
import Room from "./pages/Room/Room";
import CreateARoom from "./pages/CreateARoom/CreateARoom";
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
        path: "/room",
        element: <Room />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/createroom",
        element: <CreateARoom />,
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
