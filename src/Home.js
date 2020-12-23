import logo from "./logo.svg";
import "./Home.css";
import fblalogo from "./images/fblalogo.svg";
import React, { useState, useReducer, useEffect } from "react";
import { signInWithGoogle } from "./cloud/firebase.js";
function Home(props) {
  const [name, setName] = useState("");
  const [inputanimation, setinputAnimation] = useState(
    "animate__animated animate__bounceInLeft"
  );
  const [inputanimationdelay, setInputAnimationDelay] = useState(".85s");
  const [googleUser, setGoogleUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [inputIcon, setInputIcon] = useState("fas fa-user");

  function updateName(event) {
    setName(event.target.value);
  }

  function googleSignIn(user) {
    if (user) {
      setGoogleUser(user);
      setName(user.displayName);
      setSignedIn(true);
      props.updateGoogleUser(user)
      setInputIcon("has-text-danger fab fa-google");
    }
  }

  function alertUserName() {
    setInputAnimationDelay("0s");
    setinputAnimation((prevState) => {
      if (prevState == "animate__animated animate__shakeX") {
        return "animate__animated animate__headShake";
      } else {
        return "animate__animated animate__shakeX";
      }
    });
  }

  function beginQuiz() {
    if (name == "") {
      alertUserName();
    } else {
      props.beginQuiz(name);
    }
  }
  const googleSignInButton = (
    <button
      onClick={() => {
        signInWithGoogle(googleSignIn);
      }}
      class="has-text-danger button is-medium gsignbutton animate__animated animate__bounceInRight"
    >
      <span class="icon">
        <i class="has-text-danger fab fa-google"></i>
      </span>
      <span>Sign In With Google</span>
    </button>
  );

  const googleSignOutButton = (
    <button
      onClick={() => {
        setGoogleUser(null);
        setName("");
        setSignedIn(false);
        setInputIcon("fas fa-user");
        props.updateGoogleUser(null)
      }}
      class="has-text-danger button is-medium gsignbutton animate__animated animate__bounceInRight"
    >
      <span>Sign Out</span>
    </button>
  );

  const showRecentTakeButton = (
<button
      onClick={()=>{
        // props.setSeePastQuiz(true)
      }}
      class="has-text-danger button is-medium showRecentTakeButton  animate__animated animate__bounceInRight"
    >
      <span class="icon">
        <i class="has-text-danger fab fa-google"></i>
      </span>
      <span>Show Recent Attempt</span>
    </button>



  )

  return (
    <div class="container home_maindiv">
      <figure class="animate__animated animate__backInDown image is-hidden-touch fblalogo-desktop">
        <img src={fblalogo} />
      </figure>
      <figure class="animate__animated animate__backInDown image is-hidden-desktop fblalogo-mobile">
        <img src={fblalogo} />
      </figure>
      <div
        style={{ animationDelay: inputanimationdelay }}
        class={"field field-mobile is-hidden-desktop " + inputanimation}
      >
        <div class="control has-icons-left">
          <input
            disabled={signedIn}
            value={name}
            onChange={updateName}
            class="home_input input is-large"
            type="text"
            placeholder="Enter your Name"
          />
          <span class="icon is-small is-left">
            <i class={inputIcon}></i>
          </span>
        </div>
      </div>
      <div
        style={{ animationDelay: inputanimationdelay }}
        class={"field field-desktop is-hidden-touch " + inputanimation}
      >
        <div class="control has-icons-left">
          <input
            disabled={signedIn}
            value={name}
            onChange={updateName}
            class="home_input input is-large"
            type="text"
            placeholder="Enter your Name"
          />
          <span class="icon is-small is-left">
            <i class={inputIcon}></i>
          </span>
        </div>
      </div>
      {signedIn ? showRecentTakeButton : null}
      {!signedIn ? googleSignInButton : googleSignOutButton}

      <button
        onClick={beginQuiz}
        class="animate__backInUp animate__animated blobby-button"
      >
        Begin the Trivia!{" "}
        <span class="inner">
          <span class="blobs">
            <span class="blob"></span>
            <span class="blob"></span>
            <span class="blob"></span>

            <span class="blob"></span>
          </span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>
      </button>
      <footer class="footer animate__zoomIn animate__animated ">
        <div class="content has-text-centered">
          <p class="has-text-white">
            Made by Rishi Magiawala from Alpharetta FBLA.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
