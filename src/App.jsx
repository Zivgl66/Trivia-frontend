import "./App.css";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { createSocket } from "./actions/socket";
import Navbar from "./components/Navbar/Navbar";
// import Room from "./pages/Room/Room";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:3001");
    dispatch(createSocket(socket));

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Room /> */}
      <Outlet />
    </div>
  );
}

export default App;
