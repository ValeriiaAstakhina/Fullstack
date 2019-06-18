import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
    <div>
        <h1>{props.title}</h1>
    </div>
    )
}

const Votes = (props) => {
  console.log(props)
    return (
    <div>
        <p>has {props.vote} votes</p>
    </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


const App = (props) => {

  const header = "Anecdote of the day"
  const bestAnecdote = "Anecdote with most votes"

 // random anecdote
  const [selected, setSelected] = useState(0)
  
  // votes
  const  [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  )

  //maximum votes
  const [maxVotes, setMaxVotes] = useState(0)

  const nextAnecdote = () => () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))    
  }
     
  const votesCount = () => () => {
// increment the value in position [selected] by one
    const copyVotes = [...votes]
    copyVotes[selected]+= 1
    setVotes(copyVotes)
// update the anecdote with max votes
    setMaxVotes(copyVotes.indexOf(Math.max(...copyVotes)))

  console.log(setMaxVotes)
  }

   
  return (
    <div>
      <Header title={header} />
      {props.anecdotes[selected]}
      <br></br>
      <Votes vote={votes[selected]} />
      <Button handleClick={votesCount()} text="vote"/>
      <Button handleClick={nextAnecdote()} text="next anecdote"/>

      <Header title={bestAnecdote} />
      {props.anecdotes[maxVotes]}
      <Votes vote={votes[maxVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)







