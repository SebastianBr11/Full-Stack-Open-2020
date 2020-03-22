import React from 'react'

const PersonForm = ({newName, newNumber, handlers}) => {
  return (
    <form onSubmit={handlers.submit}>
        <div>
          name: <input onChange={handlers.name} value={newName} />
        </div>
        <div>
          number: <input onChange={handlers.number} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm
