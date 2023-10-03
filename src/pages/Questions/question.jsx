import "./App.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Navbar from "./components/Navbar/Navbar";
// import Room from "./pages/Room/Room";
import { Outlet } from "react-router-dom";

function question() {
  return (
    <div class="quiz-container">
    <h1 class="question">What is the capital of France?</h1>
    <div class="answer-choice">
        <button class="choice">London</button>
        <button class="choice">Madrid</button>
        <button class="choice">Paris</button>
        <button class="choice">Berlin</button>
    </div>
    <div class="timer">
        <span>Time Remaining: 30 seconds</span>
    </div>
</div>
  );
}

export default App;
