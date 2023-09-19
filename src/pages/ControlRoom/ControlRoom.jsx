import React, { useState } from "react";

const ControlRoom = () => {
  const [gamesArray, setGameArray] = useState([]);

  const handleClick = () => {
    return;
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center fs-3 mt-5">Control Room</h1>
      {gamesArray.map((g) => {
        return;
      })}
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
