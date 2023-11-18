import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, getPlayerResult } from "../../../actions/playerResult";
import { useEffect } from "react";
// import styles from "./playerScreen.module.css";
// import diamond from "../../../assets/diamond.svg";
// import triangle from "../../../assets/triangle.svg";
// import circle from "../../../assets/circle.svg";
// import square from "../../../assets/square.svg";
// import { CircularProgress } from "@material-ui/core";
import Answer from "../../../components/Answer/Answer";

function GuestScreen() {
  const socket = useSelector((state) => state.socketReducer.socket);
  const dispatch = useDispatch();
  const playerResult = useSelector(
    (state) => state.playerResultsReducer.playerResult
  );
  // const [playerResult, setPlayerResult] = useState(
  //   dispatch(getPlayerResult(localStorage.getItem("@guestId")))
  // );
  const [result, setResult] = useState(null);

  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isPreviewScreen, setIsPreviewScreen] = useState(false);
  const [isQuestionScreen, setIsQuestionScreen] = useState(false);
  const [isResultScreen, setIsResultScreen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answerTime, setAnswerTime] = useState(0);
  const [questionData, setQuestionData] = useState();
  const [correctAnswerCount, setCorrectAnswerCount] = useState(1);

  const [answer, setAnswer] = useState({
    questionIndex: 0,
    answers: [],
    time: 0,
  });

  useEffect(() => {
    setTimer(5);
    setTimeout(() => {
      // setResult(playerResult?.answers[0]);
    }, 1500);
  }, []);

  useEffect(() => {
    socket.on("host-start-preview", () => {
      setIsPreviewScreen(true);
      setIsResultScreen(false);
      startPreviewCountdown(5);
    });
    socket.on("host-start-question-timer", (time, question) => {
      console.log("player result at start: ", playerResult);
      setQuestionData(question.answerList);
      startQuestionCountdown(time);
      setAnswer((prevstate) => ({
        ...prevstate,
        questionIndex: question.questionIndex,
        answers: [],
        time: 0,
      }));
      setCorrectAnswerCount(question.correctAnswersCount);
    });
  }, [socket]);

  const startPreviewCountdown = (seconds) => {
    let time = seconds;
    let interval = setInterval(() => {
      setTimer(time);
      if (time === 0) {
        console.log("player result at end of time: ", playerResult);

        clearInterval(interval);
        setIsPreviewScreen(false);
        setTimeout(() => {
          setIsQuestionScreen(true);
        }, 500);
      }
      time--;
    }, 1000);
  };

  const startQuestionCountdown = (seconds) => {
    let time = seconds;
    let answerSeconds = 0;
    let interval = setInterval(() => {
      setTimer(time);
      setAnswerTime(answerSeconds);
      if (time === 0) {
        clearInterval(interval);
        setIsQuestionScreen(false);
        setIsQuestionAnswered(false);
        setIsResultScreen(true);
      }
      time--;
      answerSeconds++;
    }, 1000);
  };

  const sendAnswer = async () => {
    console.log("player result _id when sending answer: " + playerResult._id);
    console.log("when sending answer , answer time is: " + answer.time);
    // console.log("when sending answer obj is: " + answer);
    const updatedPlayerResult = await dispatch(
       addAnswer(answer, playerResult._id)
    );
    console.log("update result: " + updatedPlayerResult.answers[0]);
    setResult(
      updatedPlayerResult.answers[updatedPlayerResult.answers.length - 1]
    );
    let data = {
      questionIndex: answer.questionIndex,
      playerId: updatedPlayerResult.playerId,
      playerPoints:
        updatedPlayerResult.answers[answer.questionIndex - 1].points,
    };
    let score = updatedPlayerResult.score;
    socket.emit("send-answer-to-host", data, score);
    dispatch(getPlayerResult(playerResult._id));
  };

  const checkAnswer = (name) => {
    let answerIndex = answer.answers.findIndex((obj) => obj === name);
    console.log("answer already exists? ", answerIndex);
    console.log("player result: ", playerResult);
    if (answer.answers.includes(name)) {
      //remove answer
      setAnswer((prevstate) => ({
        ...prevstate,
        answers: [
          ...prevstate.answers.slice(0, answerIndex),
          ...prevstate.answers.slice(answerIndex + 1, prevstate.answers.length),
        ],
      }));
    } else {
      //add answer
      setAnswer((prevstate) => ({
        ...prevstate,
        answers: [...prevstate.answers, name],
      }));
    }
    setAnswer((prevstate) => ({
      ...prevstate,
      time: answerTime,
    }));
  };

  useEffect(() => {
    if (
      answer?.answers.length > 0 &&
      answer?.answers.length === correctAnswerCount
    ) {
      console.log("enterd if, answer is: " + answer.answers);
      setIsQuestionScreen(false);
      setIsQuestionAnswered(true);
      sendAnswer();
    } else {
      setIsQuestionAnswered(false);
    }
  }, [answer?.answers.length, correctAnswerCount, answer, socket]);

  return (
    <div>
      <h2>Guest Screen</h2>
      {isPreviewScreen && (
        <div>
          <h1>{timer}</h1>
        </div>
      )}
      {isQuestionScreen && (
        <div>
          {timer}
          <div>
            <Answer
              // icon={triangle}
              body={questionData[0].body}
              showText={true}
              isAnswerClicked={answer.answers.includes("a")}
              onClick={() => checkAnswer("a")}
            />
            <Answer
              // icon={diamond}
              body={questionData[1].body}
              showText={true}
              isAnswerClicked={answer.answers.includes("b")}
              onClick={() => checkAnswer("b")}
            />
            {questionData?.length > 2 && (
              <>
                <Answer
                  // icon={circle}
                  body={questionData[2].body}
                  showText={true}
                  isAnswerClicked={answer.answers.includes("c")}
                  onClick={() => checkAnswer("c")}
                />
                <Answer
                  // icon={square}
                  body={questionData[3].body}
                  showText={true}
                  isAnswerClicked={answer.answers.includes("d")}
                  onClick={() => checkAnswer("d")}
                />
              </>
            )}
          </div>
        </div>
      )}
      {isQuestionAnswered && (
        <div>
          <h1>Wait for a result</h1>
        </div>
      )}
      {isResultScreen && (
        <div style={{ backgroundColor: result?.points > 0 ? "green" : "red" }}>
          <h1>Result</h1>
          <h3>{result.points > 0 ? "Correct" : "Wrong"}</h3>
          <h3>Points: {result.points}</h3>
        </div>
      )}
    </div>
  );
}

export default GuestScreen;
