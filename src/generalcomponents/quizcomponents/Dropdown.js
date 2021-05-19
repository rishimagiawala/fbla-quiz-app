import "./Dropdown.css";
import React, { useState, useEffect, useRef } from "react";
import domtoimage from "dom-to-image";

//This component is not included within the final production due to submission requirements
function Dropdown(props) {
 
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
         
          <div class="dropdown">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Dropdown item
      </a>
      <a class="dropdown-item">
        Other dropdown item
      </a>
      <a href="#" class="dropdown-item is-active">
        Active dropdown item
      </a>
      <a href="#" class="dropdown-item">
        Other dropdown item
      </a>
      <hr class="dropdown-divider"/>
      <a href="#" class="dropdown-item">
        With a divider
      </a>
    </div>
  </div>
</div>
        </div>
        {nextButton}
      </div>
    </div>
  );
}

export default Dropdown;
