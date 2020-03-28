import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import numberServices from "./services/numberServices";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    numberServices
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber
    }

    let oldId;

    if (persons.some(p => {
      oldId = p.id
      return p.name === newNameObject.name;
    })) {
      const replace = window.confirm(`${newNameObject.name} is already added to the phonebook, replace the old number with a new one?`)

      if (replace) {
        numberServices.update(oldId, newNameObject)
          .then(changedPerson => setPersons(prevPersons => [...prevPersons.filter(n => n.id !== oldId), changedPerson]))
          setIsError(false);
          setMessage(`Changed ${newNameObject.name}'s number`)
          setTimeout(() => {
            setMessage(null);
          }, 5000)   
      }
    } else {
      numberServices.create(newNameObject)
        .then(newPerson => setPersons(prevPersons => [...prevPersons, newPerson]))
      setIsError(false);
      setMessage(`Added ${newNameObject.name}`)
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    }

    setNewName("")
    setNewNumber("")
  }


  const deletePerson = ({id, name}) => {
    const getsDeleted = window.confirm(`Delete ${name}?`);
    if (getsDeleted) {
      numberServices
        .remove(id)
        .catch(err => {
          console.log(err)
          setIsError(true)
          setMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id));
        });
      setPersons(persons.filter(n => n.id !== id));
    }
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
      <Notification message={message} isError={isError} />
      <Search filterName={filterName} handler={handleNameSearch} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handlers={handlers} />
      <h2>Numbers</h2>
      <Numbers deletePerson={deletePerson} persons={personsToShow} />
    </div>
  )
}

export default App