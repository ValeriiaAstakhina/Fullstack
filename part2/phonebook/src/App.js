import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Rows from './components/Rows.js'
import Filter from './components/Filter.js'
import AddNew from './components/AddNew.js'
import Notification from './components/Notification.js'
import SuccessMessage from './components/SuccessMessage.js'



const App = () => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ toShow, setToShow] = useState('')
  const [ persons, setPersons] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const createNew = {
        name: newName,
        number: newNumber,
    }

    const person = persons.find(p => p.name.toLowerCase() === createNew.name.toLowerCase())
    const changedPerson = { ...person, number: newNumber }

    const updatePerson = id => {
      if (window.confirm(`${newName} is already added to phonebook, replace the phone number with a new one?`))
        {personService
          .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => {
                return person.name !== p.name ? p : returnedPerson;
              }))
              setNewName('')      
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(
                `Person ${person.name} was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => person.name !== p.name))
            })
         }
    }

    if (person) {
      updatePerson()
      setSuccessMessage(
        `${createNew.name}'s phonenumber was modified`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      
    } else {

      personService
        .create(createNew)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')      
          setNewNumber('')
        })
        setSuccessMessage(
          `${createNew.name} was added to the phonebook successfuly`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
  }


  
  const deletePerson = id => {

    const person = persons.find(p => p.id === id)
    if (window.confirm('Delete ' + person.name + '?')) { 
      
      setPersons(persons.filter(p => p.id !== id))
      personService
        .deleteObject(id)
          .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          })
      .catch(error => {
        setErrorMessage(
          `Person ${person.name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {   
    setShowAll(false)    
    setToShow(event.target.value)
    
  }
    
  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(toShow.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <Filter toShow={toShow} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <AddNew  
        addPerson={addPerson}  
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
     <Rows personsToShow={personsToShow} deletePerson={deletePerson}/>    
    </div>
  )
}

export default App