import React from "react";
// import answerCheck from "../../../assets/answerCheck.svg";

function Answer({ icon, body, showText, isAnswerClicked, onClick }) {
  return (
    <div>
      <img src={icon} alt="" />
      {showText ? (
        <div onClick={onClick}>
          <h2>{body}</h2>
        </div>
      ) : (
        <div onClick={onClick}>
          <img
            style={{ visibility: isAnswerClicked ? "visible" : "hidden" }}
            // src={answerCheck}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default Answer;
