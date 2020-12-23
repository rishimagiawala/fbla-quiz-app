import "./FillInTheBlank.css";
import React, { useState, useReducer, useEffect, useRef } from "react";
import domtoimage from "dom-to-image";
function FillInTheBlank(props) {
  const [question, setQuestion] = useState(props.question);
  const [answer, setAnswer] = useState(props.answer);
  const [correctAnswer, setcorrectAnswer] = useState();
  const [userInput, setUserInput] = useState("");
  const [optionsColor, setOptionsColor] = useState("is-primary is-outlined");
  const [userInputColor, setUserInputColor] = useState("");
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [transition, setTransition] = useState("animate__fadeIn");
  const boxRef = useRef();

  function answerChecker() {
    if (userInput.toLowerCase() == answer.toLowerCase()) {
      setUserInputColor(
        "is-success has-text-success animate__animated animate__tada"
      );
      setcorrectAnswer(true);
    } else {
      setOptionsColor("is-danger");
      setUserInputColor(
        "has-text-danger is-danger animate__animated animate__jello"
      );
      setcorrectAnswer(false);
    }
    setDisabledStatus(true);
  }

  function exitQuestion() {
    domtoimage
      .toPng(boxRef.current)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        props.nextQuestion(correctAnswer, dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });

    setTransition("animate__fadeOut");
  }

  const nextButton = disabledStatus ? (
    <button
      onClick={exitQuestion}
      class="fitb_nextButton button is-success is-large is-rounded animate__animated animate__backInUp"
    >
      Next
    </button>
  ) : null;

  const submitButton = (
    <button
      onClick={answerChecker}
      class="level-item button is-large is-success fitb_submit"
    >
      <span class="icon is-medium">
        <i class="fas fa-check"></i>
      </span>
      <span>Submit</span>
    </button>
  );

  return (
    <div class={"animate__animated fitb_maindiv " + transition}>
      <div ref={boxRef} class="fitb_box box">
        <h1 class="title is-1">{props.question}</h1>
        <hr />
        <div class="fitb_inputLevel">
          <input
            disabled={disabledStatus}
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            class={
              "mb-3 fitb_userInput level-item input is-large " + userInputColor
            }
            type="text"
            placeholder="Primary input"
          />
          {!disabledStatus ? submitButton : null}
        </div>
        {correctAnswer == false ? (
          <h4 class="title is-4 has-text-success animate__animated animate__zoomIn">
            {"Correct Answer: " + answer}
          </h4>
        ) : null}
      </div>
      {nextButton}
    </div>
  );
}

export default FillInTheBlank;
