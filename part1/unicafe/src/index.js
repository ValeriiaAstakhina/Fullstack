import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
} 
 
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = (props) => {
    return (
        <>
           <td>{props.text}</td><td>{props.value}</td>
        </>
    )
}

const Statistics = (props) => {
    if (props.all=== 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
  
    return (
      <div>
          <table>
              <tbody>             
              <tr><Statistic text="good" value ={props.good} /></tr>
              <tr><Statistic text="neutral" value ={props.neutral} /></tr>
              <tr><Statistic text="bad" value ={props.bad} /></tr>
              <tr><Statistic text="all" value ={props.all} /></tr>
              <tr><Statistic text="average" value ={props.average} /></tr>
              <tr><Statistic text="positive" value ={props.positive} /></tr>
              </tbody>
            </table>
        </div>
    )
  }
 

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const title = "give feedback"

  const all = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1))/(good + neutral + bad)
  const positive = () => { 
      const positiveCount = good*100/all
      return (
      <>{positiveCount} %</>
    )
  }
  return (
    <div>
        <Header title={title}/>
        <Button handleClick={() => setGood(good + 1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="bad"/>
        
        <h2>Statistics</h2>        
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive()}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)