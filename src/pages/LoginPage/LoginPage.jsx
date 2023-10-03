import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../constants/actionTypes";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //  If theres a profile picture and username, let user press join button
  useEffect(() => {
    if (password !== "" && username !== "") {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [password, username]);

  const handleSubmit = () => {
    let user = {
      username,
      password,
    };
    axios
      .post("/users/login", user)
      .then((res) => {
        console.log(res.data.token);
        // localStorage.setItem("@token", res.data);
        // let user = jwt_decode(res.data);
        if (res.data.message == "success") {
          console.log("in in in ");
          dispatch({ type: LOGIN, payload: res.data.token });
          navigate("/controlroom");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-item-center mt-5">
      <div className="login-text text-center">
        <h3 className="">
          If you dont have a user already, please <a href="/signup">signup</a>
        </h3>
        <h1>Login</h1>
      </div>
      <form className="d-flex flex-column mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control fs-4 text-center"
            id="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        Login
      </button>
    </div>
  );
};

export default LoginPage;
