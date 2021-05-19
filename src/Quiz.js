import "./Quiz.css";
import React, { useState, useReducer, useEffect } from "react";
import Loading from "./generalcomponents/Loading";
import firebase from "./cloud/firebase";
import QuizHandler from "./generalcomponents/quizcomponents/QuizHandler";
import Results from './Results'

function Quiz(props) {
  const [recieved, setRecieved] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loadingtitle, setLoadingTitle] = useState("Generating Quiz");
  const [grade, setGrade] = useState();
  const [results, setResults] = useState();
  const [quizOver, setQuizOver] = useState(false);

  //To make the quiz starting seem nicer I increased the loading time of the Loading component to 2 secs to make it look nice and offer a good transition.
  function startQuiz() {
    const timer = setTimeout(() => {
      setRecieved(!recieved);
    }, 2000);
    return () => clearTimeout(timer);
  }

  //A function that shuffles the values of the passed array 
  function shuffle(arr) {
    return arr
      .map(function (val, i) {
        return [Math.random(), i];
      })
      .sort()
      .map(function (val) {
        return val[1];
      });
  }

  const generateQuiz = async () => {
    const numOfQuestions = await firebase
      .database()
      .ref("questions")
      .once("value")
      .then((snap) => {
        // console.log(snap.numChildren());
        return snap.numChildren();
      });

    var indexarr = [];
    for (var i = 0; i < numOfQuestions; i++) indexarr.push(i);
    //I call the function here to shuffle the values in the array to make the quiz random and also make sure that there are no duplicates
    indexarr = shuffle(indexarr);

    for (var i = 0; i < 5; i++) {
      firebase
        .database()
        .ref("questions/" + indexarr[i])
        .once("value", (snap) => {
          // console.log(snap.val());
          setQuestions((prevState) => {
            var tempArray = prevState;
            tempArray.push(snap.val());
            return tempArray;
          });
        });
    }
  };

  function leaderboard(quizgrade, quizresults) {
    setQuizOver(true);
    setGrade(quizgrade);
    setResults(quizresults);
  }

  useEffect(() => {
    generateQuiz();

    const timer = setTimeout(() => {
      setLoadingTitle("Loading");
      startQuiz();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  var temp = !recieved ? (
    <Loading title={loadingtitle} />
  ) : (
    <QuizHandler leaderboard={leaderboard} questions={questions} />
  );
  // console.log('The Questions for the Quiz: ' + JSON.stringify(questions))
  return (
    <div class="quiz_maindiv">
      {!quizOver ? (
        temp
      ) : (
        <div>
          {/* <h1 class="title is-1">{grade}%</h1>
          {results} */}
          <Results googleUser={props.googleUser} name={props.name} results={results} grade={grade} setstartQuiz = {props.setstartQuiz}/>
        </div>
      )}
    </div>
  );
}

export default Quiz;
