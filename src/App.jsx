import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Room from "./pages/Room/Room";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Room /> */}
      <Outlet />
    </div>
  );
}

export default App;
