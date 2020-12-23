import logo from "./logo.svg";
import "./App.css";
import fblalogo from "./images/fblalogo.svg";
import React, { useState, useReducer, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Home from "./Home";
import Quiz from "./Quiz";
import FillInTheBlank from "./generalcomponents/quizcomponents/FillInTheBlank";
import Results from "./Results";
import firebase, { userDatabase } from "./cloud/firebase";
function App() {
  const [startQuiz, setstartQuiz] = useState(false);
  const [name, setName] = useState("");
  const [googleUser, setGoogleUser] = useState();
  const [seePastQuiz, setSeePastQuiz] = useState(false);
  const [pastQuizData, setPastQuizData] = useState({
    results: 10,
    grade: 420
  });
  const [pastQuizDataAvailable, setPastQuizDataAvailable] = useState(false)
  const [pastQuizResults, setPastQuizResults] = useState()

  function beginQuiz(username) {
    setstartQuiz(true);
    setName(username);
  }
  function updateGoogleUser(user) {
    setGoogleUser(user);
    if(user){
    firebase
      .database(userDatabase)
      .ref("users/" + user.uid + "/recentResult")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() != null) {
          
         
          setPastQuizDataAvailable(true)
          setPastQuizData(snapshot.val())
          setPastQuizResults(snapshot.val().results)
        } else {
          console.log("Aint shit here");
          
        }
        // ...
      })
      .catch((error)=>{
        console.log(error)
      });
    }
  }
  const pastQuiz =  <Results googleUser={googleUser} name={name} results={pastQuizResults} grade={pastQuizData.grade} setstartQuiz = {setstartQuiz}/>
  const stuff = (
    <CSSTransition in={startQuiz} classNames="appanim" timeout={1200}>
      {!startQuiz ? (
        <Home
      setSeePastQuiz = {setSeePastQuiz}
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
    {(seePastQuiz && pastQuizDataAvailable) ? pastQuiz : stuff}
    </div>;
}

export default App;
