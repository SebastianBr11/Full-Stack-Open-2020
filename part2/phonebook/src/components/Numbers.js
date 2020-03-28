import React from 'react'
import Number from "./Number";

const Numbers = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map(person => (
        <Number key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </>
  )
}

export default Numbers