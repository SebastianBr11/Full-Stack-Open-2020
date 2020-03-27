import React from 'react'
import { useState } from 'react'
import Country from './Country'

const CountryListItem = ({country}) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div>
      <p>{country.name}</p>
      <button onClick={() => setIsShown(!isShown)}>show</button>
      {isShown ? <Country country={country} /> : null}
    </div>
  )
}

export default CountryListItem
