import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import profileImg from "../../assets/Profile Pictures/NoProfileImg.png";
import idoP from "../../assets/Profile Pictures/IdoProfile.jpg";

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

  //  If theres a profile picture and username, let user press join button
  useEffect(() => {
    if (profileP != profileImg && username != "") {
      setIsDisabled(false);
    }
  }, [profileP, username]);

  //  After submiting - send post request and add a new user, if ok - navigate to the game room
  const handleSubmit = (e) => {
    e.preventDefault();
    let newGuest = {
      username,
      profileImage: profileP,
      isManager: false,
      numberOfRights: 0,
      numberOfRightsInARow: 0,
    };
    axios
      .post("/guests", newGuest)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.status === "ok") {
          console.log(res.data.message);
          navigate("/waitingroom");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-item-center mt-5">
      <img
        src={profileP}
        alt=""
        className="w-25 rounded-circle border border-black align-self-center  border-2 img-fluid"
        // style={{ transitionDuration: "all 3s ease-out" }}
      />
      <form className="d-flex flex-column mt-3">
        <div className="mb-3">
          {/* <label htmlFor="name" className="form-label text-center">
            Choose your Name
          </label> */}
          <input
            type="text"
            className="form-control fs-4 text-center"
            id="name"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // aria-describedby="emailHelp"
          />
        </div>
      </form>
      <button
        htmlFor="profilePicture"
        className="btn btn-lg btn-danger mb-3"
        onClick={handleOpen}
      >
        Choose your Picture
      </button>
      <button
        type="submit"
        className="btn btn-lg btn-primary"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Join
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="container mt-5 d-flex flex-column bg-primary">
          <button className="btn" onClick={() => chooseImg(idoP)}>
            <img
              src="https://i.ibb.co/nRPczYW/Ido-Profile.jpg"
              className="w-25 rounded-circle"
              alt="Ido profile picture"
            />
          </button>
          <button className="btn btn-danger btn-md mb-3" onClick={handleClose}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GuestSignUp;
