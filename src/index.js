import React from "react";
import ReactDOM from "react-dom/client";

// changes start here -
import axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// changed end here

import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//  PAGES
import OpenRoom from "./pages/Home/Home";
import CreateARoom from "./pages/CreateARoom/CreateARoom";
import Room from "./pages/WaitingRoom/WaitingRoom";
import GuestSignUp from "./pages/GuestSignUp/GuestSignUp";
import SignUp from "./pages/SignUp/SignUp";
import ControlRoom from "./pages/ControlRoom/ControlRoom";
import WaitingRoom from "./pages/WaitingRoom/WaitingRoom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//  TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import HostScreen from "./pages/Game/HostScreen/HostScreen";
import GuestScreen from "./pages/Game/GuestScreen/GuestScreen";

// //  Default url axios
axios.defaults.baseURL = "http://localhost:3001/api/";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/controlroom",
        element: <ControlRoom />,
      },
      {
        path: "/home",
        element: <OpenRoom />,
      },
      {
        path: "/guestsignup/:roomCode",
        element: <GuestSignUp />,
      },
      {
        path: "/createroom",
        element: <CreateARoom />,
      },
      {
        path: "/room/host/:id",
        element: <HostScreen />,
      },
      {
        path: "/room/guest/:id",
        element: <GuestScreen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
