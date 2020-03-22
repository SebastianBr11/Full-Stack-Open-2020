import React from 'react'
import Number from "./Number";

const Numbers = ({persons}) => {
  return (
    <>
      {persons.map(person => (
        <Number key={person.name} person={person} />
      ))}
    </>
  )
}

export default Numbers