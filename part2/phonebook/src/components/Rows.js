import React from 'react'

const Person = (props) => {
    return(
    <div>
      {props.name} {props.number}
      <button onClick={props.deletePerson}>delete</button>
    </div>
    )
  }
const Rows = (props) => {
    return(
      props.personsToShow.map(person =>
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        deletePerson={() => props.deletePerson(person.id)}
      />
      )
    )
  }

export default Rows