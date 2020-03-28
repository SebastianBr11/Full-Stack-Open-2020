import React from 'react'

const Number = ({ person, deletePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
  )
}

export default Number