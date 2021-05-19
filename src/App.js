import logo from "./logo.svg";
import "./App.css";
import fblalogo from "./images/fblalogo.svg";
import React, { useState, useReducer, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Home from "./Home";
import Quiz from "./Quiz";
import FillInTheBlank from "./generalcomponents/quizcomponents/FillInTheBlank";
import Results from "./Results";
import firebase, { userDatabase , storageRef } from "./cloud/firebase";
function App() {
  const [startQuiz, setstartQuiz] = useState(false);
  const [name, setName] = useState("");
  const [googleUser, setGoogleUser] = useState();


  function beginQuiz(username) {
    setstartQuiz(true);
    setName(username);
  }
  function updateGoogleUser(user) {
    setGoogleUser(user);
    
  }
  
  const main = (
    //css transition from a css library that provides a nice fade in animation between the Home and Quiz Components
    <CSSTransition in={startQuiz} classNames="appanim" timeout={1200}>
      {!startQuiz ? (
        <Home
          updateGoogleUser={updateGoogleUser}
          key="home"
          beginQuiz={beginQuiz}
        />
      ) : (
        <Quiz
          setstartQuiz={setstartQuiz}
          googleUser={googleUser}
          name={name}
          key="quiz"
        />
      )}
    </CSSTransition>
  );
  return <div class="app_maindiv">
    {main}
    </div>;
}

export default App;
