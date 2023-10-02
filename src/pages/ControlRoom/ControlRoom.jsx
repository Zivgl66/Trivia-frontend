import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../dbmockup.json";
import GameCube from "../../components/GameCube/GameCube";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

const ControlRoom = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [gamesArray, setGameArray] = useState([]);

  useEffect(() => {
    setGameArray(data.games);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

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
