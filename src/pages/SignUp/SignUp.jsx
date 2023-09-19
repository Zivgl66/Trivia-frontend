import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/Profile Pictures/NoProfileImg.png";
import { notify } from "../../utils/functions";

const Signup = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(profileImg);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (password != "" && username != "" && email != "" && name != "") {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [password, username]);

  //  After submiting - send post request and add a new user, if ok - navigate to the game room
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      username,
      name,
      email,
      password,
      profileImage: profilePicture,
      isAdmin: true,
    };
    axios
      .post("/users/signup", newUser)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.status === "ok") {
          console.log(res.data.message);
          notify(res.data.message);
          navigate("/login");
        } else {
          console.log(res.data.message);
          notify(res.data.message);
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-item-center mt-5">
      <h1 className="text-center">Sign Up:</h1>
      <form className="d-flex flex-column mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control fs-4 text-center"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control fs-4 text-center mt-3"
            id="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="form-control fs-4 text-center mt-3"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control fs-4 text-center mt-3"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>

      <button
        type="submit"
        className="btn btn-lg btn-primary"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Join
      </button>
    </div>
  );
};

export default Signup;
