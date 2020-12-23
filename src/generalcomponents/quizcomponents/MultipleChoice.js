import "./MultipleChoice.css";
import React, { useState, useReducer, useEffect, useRef } from "react";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";

function MultipleChoice(props) {
  const [question, setQuestion] = useState(props.question);
  const [correctAnswer, setcorrectAnswer] = useState();
  const [optionsColor, setOptionsColor] = useState("is-primary is-outlined");
  const [answerColor, setAnswerColor] = useState("is-primary is-outlined");
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [transition, setTransition] = useState("animate__fadeIn");

  const boxRef = useRef();

  useEffect(() => {}, []);

  function answerChecker(event) {
    if (event.target.name == props.answer) {
      setAnswerColor("is-success animate__animated animate__tada");
      setcorrectAnswer(true);
    } else {
      setOptionsColor("is-danger");
      setAnswerColor("is-success animate__animated animate__jello");
      setcorrectAnswer(false);
    }
    setDisabledStatus(true);
  }

  function exitQuestion() {
    domtoimage
      .toPng(boxRef.current)
      .then(function (dataUrl) {
        props.nextQuestion(correctAnswer, dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });

    setTransition("animate__fadeOut");
  }

  const optionButtons = props.options.map((value, index, array) => {
    if (value == props.answer) {
      return (
        <button
        key={index}
          disabled={disabledStatus}
          onClick={answerChecker}
          name={value}
          class={"mc_button button " + answerColor}
        >
          {value}
        </button>
      );
    }
    return (
      <button
        disabled={disabledStatus}
        onClick={answerChecker}
        name={value}
        class={"mc_button button " + optionsColor}
      >
        {value}
      </button>
    );
  });

  const nextButton = disabledStatus ? (
    <button
      onClick={exitQuestion}
      class="mc_nextButton button is-success is-large is-rounded animate__animated animate__backInUp"
    >
      Next
    </button>
  ) : null;

  return (
    <div>
      <div class={"animate__animated mc_maindiv " + transition}>
        <div id="want" ref={boxRef} class="mc_box box">
          <h2 class="title is-2">{props.question}</h2>
          <hr />
          <div class="buttons mc_buttons are-large column">{optionButtons}</div>
        </div>
        {nextButton}
      </div>
    </div>
  );
}

export default MultipleChoice;
