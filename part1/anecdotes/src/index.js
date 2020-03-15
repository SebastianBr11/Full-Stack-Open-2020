import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Votes = ({votes}) => {
  return (
    <p>has {votes} votes</p>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })  

  const getMaxVotes = () => {
    return Math.max(...Object.values(votes))
  }

  const bestAnecKey = Object.keys(votes).filter(key => votes[key] === getMaxVotes())

  const handleVote = () => {
    setVotes({...votes, [selected]: votes[selected] + 1})
  }

  const currentAnec = props.anecdotes[selected];

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <p>{currentAnec}</p>
      <Votes votes={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={() => setSelected(getRandomInt(6))} text="next anecdote" />
      <Heading text="Anecdote with most votes" />
      <p>{anecdotes[bestAnecKey[0]]}</p>
      <Votes votes={getMaxVotes()} />
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