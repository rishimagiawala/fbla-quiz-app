import React, { useState, useReducer, useEffect } from 'react'
import MultipleChoice from './MultipleChoice'
import './QuizHandler.css'
import fblalogo from '../../images/fblalogo.svg'
import FillInTheBlank from './FillInTheBlank'
import Dropdown from './Dropdown'


function QuizHandler(props){
  const[questions, setQuestions] = useState(props.questions)
  const[currentQuestion, setCurrentQuestion]=useState(0)
  const[numberRight, setnumberRight] = useState(0)
    const[showResults, setshowResults] = useState(false)
const[questionPhotos, setQuestionPhotos] = useState([])
 


useEffect(()=>{


}




,[])

function nextQuestion(answer , image){
  var right = numberRight
  // console.log(image)
//  console.log(answer)
setQuestionPhotos((prevState)=>{
  var tempArray = prevState
  tempArray.push(
    
    <div key={currentQuestion} class='res_questionImageDiv'>
  <img class='res_questionImage' src={image}/>
  </div>
  
  )
  return tempArray
})
  if(currentQuestion < questions.length-1){
setCurrentQuestion(currentQuestion + 1)

if(answer == true){
  setnumberRight(numberRight+1)
  right++
}
  }
else {
  if(answer == true){
    setnumberRight(numberRight+1)
    right++
  }
 
  props.leaderboard((right/(questions.length))*100, questionPhotos)
}


}


const samplemc = props.questions.map((value,index,arr)=>{
  if(arr[index].type == 'mc'){

// return (<MultipleChoice key={currentQuestion} nextQuestion={nextQuestion} question={arr[index].question} options={arr[index].options} answer={arr[index].answer}/>)
return (<Dropdown key={currentQuestion} nextQuestion={nextQuestion} question={arr[index].question} options={arr[index].options} answer={arr[index].answer}/>)
  }
  else if(arr[index].type == 'fitb')
  
return <FillInTheBlank key={currentQuestion} nextQuestion={nextQuestion} question={arr[index].question} answer={arr[index].answer}/>



})


return(
<div class='qh_maindiv'>
    {samplemc[currentQuestion]}
  </div>


)

}

export default QuizHandler