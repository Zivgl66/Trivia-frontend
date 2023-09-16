import "./Navbar.style.css";
import logo from "../../assets/logoNoBackground.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-dark d-flex p-2 justify-content-center align-item-center">
      <Link to={"/"} className="navbar-logo">
        <img src={logo} alt="website logo" className="logo-img" />
      </Link>
    </div>
  );
};

export default Navbar;
