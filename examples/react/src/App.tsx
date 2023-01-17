import React, { useState } from 'react'
import './App.css'

import { findPetsByStatus, addPet } from './api'

function App() {
  const [pets, setPets] = useState<string[]>([])

  async function onClick() {
    // !!! -> Types are working here
    const resp = await findPetsByStatus(fetch, { status: 'pending' })
    const newNames = resp.data.map((pet) => pet.name)
    setPets(newNames)

    // Uncomment this line to see the error:
    // await findPetsByStatus(fetch, { status: '123' })
  }

  async function createPet() {
    // const resp = await addPet(fetch, {id})
  }

  return (
    <div className='App'>
      {pets.map((name) => (
        <div key={name}>{name}</div>
      ))}
      <button onClick={onClick}>Fetch</button>
      <br />
      <button onClick={createPet}>Create pet</button>
    </div>
  )
}

export default App
