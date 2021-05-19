import React, {useEffect , useState, useRef} from "react";
import "./Results.css";
import fblalogo from "./images/fblalogo.svg";

import firebase, {userDatabase, storageRef} from './cloud/firebase'
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';

export default function Results(props) {
  
  const refResult = useRef()
  useEffect(() => {
    console.log(props.results)
    if (props.googleUser && props.results && props.grade) {
      html2canvas(refResult.current, {backgroundColor:'#308ED1'}).then(function(canvas) {
        canvas.toBlob(function(blob) {
          var userQuiz = storageRef.child('pastQuizAttempts/' + props.googleUser.uid + '.png');
          userQuiz.put(blob).then(function(snapshot) {
            console.log('Uploaded user quiz');
          });
         

        })
    });

    }
  }, [props.results , props.grade]);

  return (
    <div class='res_fakediv animate__animated animate__fadeIn'>
    <div ref={refResult} class="res_maindiv">
      <div data-html2canvas-ignore class="noprint res_topButtons">
      <button
          onClick={() => {
            props.setstartQuiz();
          }}
          class="res_topButton button is-success"
        >
          <span class="icon is-small">
            <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
        </button>
      <button onClick={()=>{
          window.print()
        }} class="res_topButton button is-success">
          <span class="icon is-small">
          <i class="fas fa-file-pdf"></i>
          </span>
          <span>Print as PDF</span>
        </button>
        <button onClick={()=>{
          html2canvas(refResult.current, {backgroundColor:'#308ED1'}).then(function(canvas) {
            canvas.toBlob(function(blob) {
              saveAs(blob, props.name +'.png'); 
            })
        });
        }} class="res_topButton button is-success">
          <span class="icon is-small">
          <i class="fas fa-file-image"></i>
          </span>
          <span>Print as PNG</span>
        </button>
      </div>
      <div class="res_userDiv container">
        <img class="res_userimg" src={fblalogo} />
        <h1 class="res_userName title is-1 has-text-white">
          {props.name}'s Score: {props.grade}%
        </h1>
      </div>
      <div class="res_questionPhotos">{props.results}</div>
    </div>
    </div>
  );
}
