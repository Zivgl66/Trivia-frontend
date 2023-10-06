import React from "react";

const GameCube = ({ game, startGame }) => {
  return (
    <div className="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
      <img src={game.image} className="card-img-top" alt="..." />
      <div className="card-body text-primary">
        <h5 className="card-title">{game.name}</h5>
        <p className="card-text">{game.description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => startGame(game)}
        >
          Start
        </button>
        <button type="button" className="btn btn-outline-primary">
          Edit
        </button>
      </div>
    </div>
  );
};

export default GameCube;
