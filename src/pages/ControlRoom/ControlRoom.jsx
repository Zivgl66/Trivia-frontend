import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_ROOM,
  FETCH_ROOM,
  ADD_PLAYER,
  CHOOSE_GAME,
} from "../../constants/actionTypes";
import { createLeaderboard } from "../../actions/leaderboard";
// import socketReducer from "../../reducers/socket";

//components
import GameCube from "../../components/GameCube/GameCube";
import Loader from "../../components/Loader/Loader";

const ControlRoom = () => {
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socketReducer.socket);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("@user")));
  const [loading, setLoading] = useState(true);
  const [gamesArray, setGameArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/games/usergames/${user.id}`)
      .then((res) => {
        if (res.data.status == "success") {
          // console.log("response from game api: ", res.data.games);
          setGameArray(res.data.games);
        }
      })
      .catch((err) => {
        console.error("error from axios " + err);
      });
    // console.log("games: " + gamesArray);
    setLoading(false);
  }, []);

  const handleClick = () => {
    // console.log(gamesArray);
  };

  const moveToHostScreen = async (roomData) => {
    //  let leaderboardData = { roomId: res.data.room._id, playerResultList: [] }
    const newLeaderboard = await dispatch(
      createLeaderboard({
        roomId: roomData._id,
        playerResultList: [],
      })
    );
    // console.log("leaderboard is : ", newLeaderboard);
    socket.emit("init-game", roomData, newLeaderboard);
    navigate(`/room/host/${roomData._id}`);
  };

  const startGame = async (game) => {
    // console.log("socket: " + socket);
    // console.log("game id: " + game._id);
    axios
      .post("/rooms", { hostId: user.id, gameId: game._id })
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.status === "success") {
          // console.log(res.data.room);
          dispatch({ type: CREATE_ROOM, payload: res.data.room });
          dispatch({ type: CHOOSE_GAME, payload: game });
          moveToHostScreen(res.data.room);
          // navigate(`/room/host/${res.data.room._id}`);
          // //  let leaderboardData = { roomId: res.data.room._id, playerResultList: [] }
          // const newLeaderboard = dispatch(
          //   createLeaderboard({
          //     roomId: res.data.room._id,
          //     playerResultList: [],
          //   })
          // );
          // console.log("leaderboard is : ", newLeaderboard);
          // socket.emit("init-game", res.data.room, newLeaderboard);
        } else {
          // console.log(res.data.message);
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
