import React, {useEffect , useState, useRef} from "react";
import "./Results.css";
import fblalogo from "./images/fblalogo.svg";
import { testImage } from "./images/testImage";
import firebase, {userDatabase, storageRef} from './cloud/firebase'
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';

export default function Results(props) {
  const [grade, setGrade] = useState(props.grade)
  const [results, setResults] = useState(props.results)
  const refResult = useRef()
  useEffect(() => {
    console.log(props.results)
    if (props.googleUser && props.results && props.grade) {
      html2canvas(refResult.current, {backgroundColor:'#308ED1'}).then(function(canvas) {
        canvas.toBlob(function(blob) {
          var userQuiz = storageRef.child('pastQuizAttempts/' + props.googleUser.uid + '.png');
          userQuiz.put(blob).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });
         

        })
    });

  

      // firebase.database(userDatabase).ref('users/' + props.googleUser.uid).update({
      //  recentResult: {
      //    grade: props.grade,
      //    results: JSON.parse(JSON.stringify(props.results))
      //  }
       
      // }, function(error) {
      //   if (error) {
      //     console.log(error)
      //   } else {
      //     console.log('user updated in database')
      //   }
      // });
    }
  }, [props.results , props.grade]);

  return (
    <div ref={refResult} class="res_maindiv">
      <div data-html2canvas-ignore class="noprint res_topButtons">
        <button onClick={()=>{
          html2canvas(refResult.current, {backgroundColor:'#308ED1'}).then(function(canvas) {
            canvas.toBlob(function(blob) {
              saveAs(blob, props.name +'.png'); 
            })
        });
        }} class="res_topButton button is-success">
          <span class="icon is-small">
            <i class="fas fa-print"></i>
          </span>
          <span>Print</span>
        </button>
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
      </div>
      <div class="res_userDiv container">
        <img class="res_userimg" src={fblalogo} />
        <h1 class="res_userName title is-1 has-text-white">
          {props.name}'s Score: {props.grade}%
        </h1>
      </div>
      <div class="res_questionPhotos">{props.results}</div>
    </div>
  );
}
