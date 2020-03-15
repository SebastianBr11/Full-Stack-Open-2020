import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const Heading = ({text}) => {
  return (<h1>{text}</h1>)
}

const Statistic = ({text, val}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{val}</td>
    </tr>
  )
}

const Statistics = ({amounts}) => {
  const [amountGood, amountNeutral, amountBad] = amounts;

  if (!(amountGood || amountNeutral || amountBad)) return <p>No feedback given</p>;

  const sum = amounts.reduce((sum, add) => sum += add)
  const avg = (amountGood - amountBad) / sum
  const positive = (amountGood / sum) * 100 + " %"

  return (
    <table>
      <tbody>
        <Statistic text="good" val={amountGood} />
        <Statistic text="neutral" val={amountNeutral} />
        <Statistic text="bad" val={amountBad} />
        <Statistic text="all" val={sum} />
        <Statistic text="average" val={avg} />
        <Statistic text="positive" val={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Heading text="statistics" />
      <Statistics amounts={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)