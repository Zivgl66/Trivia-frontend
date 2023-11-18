import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Question from "../../../components/Question/Question";
import WaitingRoom from "../WaitingRoom/WaitingRoom";

const HostScreen = () => {
  let { id } = useParams();
  const socket = useSelector((state) => state.socketReducer.socket);
  // const game = useSelector((state) => state.gameReducer.game);
  const [game, setGame] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionScreen, setQuestionScreen] = useState(false);
  const [questionResultScreen, setQuestionResultScreen] = useState(false);
  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false },
      { name: "b", body: "", isCorrect: false },
      { name: "c", body: "", isCorrect: false },
      { name: "d", body: "", isCorrect: false },
    ],
    questionIndex: 1,
  });
  const [playerList, setPlayerList] = useState([]);
  const [previewScreen, setPreviewScreen] = useState(false);

  const startGame = () => {
    socket.emit("start-game", { game });
    socket.emit("question-preview", () => {
      startPreviewCountdown(5, currentQuestionIndex);
    });
    setGameStarted((prevstate) => !prevstate);
    setPreviewScreen(true);
  };

  const startPreviewCountdown = (seconds, index) => {
    // setIsLeaderboardScreen(false);
    setPreviewScreen(true);
    let time = seconds;
    let interval = setInterval(() => {
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
        displayQuestion(index);
        setPreviewScreen(false);
        setQuestionScreen(true);
      }
      time--;
    }, 1000);
  };
  const startQuestionCountdown = (seconds, index) => {
    let time = seconds;
    let interval = setInterval(() => {
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
        displayQuestionResult(index);
      }
      time--;
    }, 1000);
  };
  const displayQuestionResult = (index) => {
    setQuestionScreen(false);
    setQuestionResultScreen(true);
    setTimeout(() => {
      // displayCurrentLeaderBoard(index);
    }, 5000);
  };
  const displayQuestion = (index) => {
    if (index === game.questionList.length) {
      // displayCurrentLeaderBoard(index);
      return;
    } else {
      setQuestionData(game.questionList[index]);
      setCurrentQuestionIndex((prevstate) => prevstate + 1);
      let time = game.questionList[index].answerTime;
      let question = {
        answerList: game.questionList[index].answerList,
        questionIndex: game.questionList[index].questionIndex,
        correctAnswersCount: game.questionList[index].answerList.filter(
          (answer) => answer.isCorrect === true
        ).length,
      };
      socket.emit("start-question-timer", 10, question, () => {
        startQuestionCountdown(time, index + 1);
      });
    }
  };
  useEffect(() => {
    axios
      .get(`/rooms/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          axios
            .get(`/games/${res.data.room.gameId}`)
            .then((res) => {
              if (res.data.status === "success") {
                setGame(res.data.game);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    socket.on("get-answer-from-player", (data, id, score, player) => {
      // updateLeaderboard(data, id, score);
      let playerData = {
        id: data.guestId,
        userName: player.guestName,
        picture: player.guestPicture,
      };
      setPlayerList((prevstate) => [...prevstate, playerData]);
    });
  }, [socket]);
  return (
    <div>
      <h2>Host screen</h2>
      {!gameStarted && <WaitingRoom socket={socket} startGame={startGame} />}
      {previewScreen && (
        <div className="preview-screen">
          <h1>We begin in:</h1>
          <h1>{timer}</h1>
        </div>
      )}
      {questionScreen && (
        <div>
          <Question
            key={questionData.questionIndex}
            question={questionData}
            timer={timer}
            host={true}
          />
        </div>
      )}
      {/* {questionResultScreen && (
        <div>
          <div>
            <h1>Question result</h1>
            <ol>
              {questionResult.questionResultList.map((player) => (
                <li>
                  {playerList
                    .filter((x) => x.id === player.playerId)
                    .map((x) => (
                      <mark>{x.userName}</mark>
                    ))}
                  <small>{player.playerPoints}</small>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default HostScreen;
