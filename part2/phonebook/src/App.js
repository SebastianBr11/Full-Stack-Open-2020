import React, { useState, useEffect } from "react";
import axios from "axios";
import Numbers from "./components/Numbers";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newNameObject));
    }

    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberInput = e => {
    setNewNumber(e.target.value)
  }

  const handleNameSearch = e => {
    setFilterName(e.target.value)
  }

  const personsToShow = filterName
    ? persons.filter(p => p.name.match(new RegExp(filterName, "gi")))
    : persons;

  const handlers = {
    name: handleNameChange,
    number: handleNumberInput,
    submit: handleSubmit
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterName={filterName} handler={handleNameSearch} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handlers={handlers} />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App