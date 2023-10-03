import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import profileImg from "../../assets/Profile Pictures/NoProfileImg.png";
import idoP from "../../assets/Profile Pictures/IdoProfile.jpg";
import "./GuestSignUp.css";
const GuestSignUp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [profileP, setProfileP] = useState(profileImg);
  const [username, setUsername] = useState("");

  //  On press of an image inside the modal, change img src and clost modal
  const chooseImg = (url) => {
    setProfileP(url);
    setOpen(false);
  };

  const selectImage = (e) => {
    e.preventDefault();
    let imageUrl = axios
      .post("/images", { imageUrl: "https://i.ibb.co/nRPczYW/Ido-Profile.jpg" })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("ff");
        }
      });
  };

  //  If theres a profile picture and username, let user press join button
  useEffect(() => {
    if (profileP != profileImg && username != "") {
      setIsDisabled(false);
    }
  }, [profileP, username]);

  //  After submiting - send post request and add a new user, if ok - navigate to the game room
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      username,
      profileImage: profileP,
      isAdmin: false,
      isManager: false,
      numberOfRights: 0,
      numberOfRightsInARow: 0,
    };
    axios
      .post("/users", newUser)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.status === "ok") {
          console.log(res.data.message);
          navigate("/");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };

  return (
    <div className="all-container">
      <h1 className="neon-text">Welcome</h1>
      <div className="change-postion">
        <img
          src={profileP}
          alt=""
          className="image-profile"
          onClick={handleOpen}
        />
        <form className="d-flex flex-column mt-3">
          <div className="mb-3">
            {/* <label htmlFor="name" className="form-label text-center">
            Choose your Name
          </label> */}
            <input
              type="text"
              className="form-control fs-7 text-center"
              id="name"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // aria-describedby="emailHelp"
            />
          </div>
        </form>

        <button
          type="submit"
          className="button-join"
          id="join"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Join
        </button>
        <Modal open={open} onClose={handleClose}>
          <div className=" body">
            <button className="btn" onClick={() => chooseImg(idoP)}>
              <img
                src="https://i.ibb.co/nRPczYW/Ido-Profile.jpg"
                className="w-25 "
                alt="Ido profile picture"
              />
            </button>
            <button
              className="btn btn-danger btn-md mb-3"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GuestSignUp;
