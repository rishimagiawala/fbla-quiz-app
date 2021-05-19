import React, { useState, useReducer, useEffect } from 'react'
import MultipleChoice from './MultipleChoice'
import './QuizHandler.css'
import FillInTheBlank from './FillInTheBlank'


function QuizHandler(props){
  const[questions, setQuestions] = useState(props.questions)
  const[currentQuestion, setCurrentQuestion]=useState(0)
  const[numberRight, setnumberRight] = useState(0)
    const[showResults, setshowResults] = useState(false)
const[questionPhotos, setQuestionPhotos] = useState([])
 



//A function that is passed to each question component through props, when this is called it will check to see if the question was answered correctly and update the user's score


function nextQuestion(answer , image){
  var right = numberRight
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
    //goes to the next question in the array of questions.
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

//For each question objects from the JSON, depending on the type parameter specified it will map it to the proper component
const samplemc = props.questions.map((value,index,arr)=>{
  if(arr[index].type == 'mc'){

return (<MultipleChoice key={currentQuestion} nextQuestion={nextQuestion} question={arr[index].question} options={arr[index].options} answer={arr[index].answer}/>)
// return (<Dropdown key={currentQuestion} nextQuestion={nextQuestion} question={arr[index].question} options={arr[index].options} answer={arr[index].answer}/>)
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