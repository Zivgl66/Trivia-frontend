import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import data from "../../dbmockup.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../actions/room";

//components
import GameCube from "../../components/GameCube/GameCube";
import Loader from "../../components/Loader/Loader";

const ControlRoom = () => {
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("@user")));
  const [loading, setLoading] = useState(true);
  const [gamesArray, setGameArray] = useState([]);

  useEffect(() => {
    axios
      .get(`/games/usergames/${user.id}`)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setGameArray(res.data.games);
        }
      })
      .catch((err) => {
        console.error("error from axios " + err);
      });
    console.log("games: " + gamesArray);
    setLoading(false);
  }, []);

  const handleClick = () => {
    console.log(gamesArray);
  };
  const startGame = (id) => {
    console.log("game id: " + id);
    axios
      .post("/rooms", { gameId: id })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.status === "success") {
          console.log(res.data.message);
          navigate("/waitingRoom");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center fs-3 mt-5 mb-5">Control Room</h1>
      <h2>Hello {user.name}</h2>
      <div className="games align-self-center">
        {gamesArray.map((game, index) => {
          return (
            <GameCube game={game} startGame={startGame} key={index + "game"} />
          );
        })}
      </div>

      <button className="btn btn-primary mt-3" onClick={handleClick}>
        Create Trivia Game
      </button>
      <button className="btn btn-danger mt-3" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default ControlRoom;
