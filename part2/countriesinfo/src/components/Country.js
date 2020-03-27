import React from 'react'
import Weather from './Weather'

const Country = ({country = null}) => {
  return (
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population { country.population }</p>
        <h3>languages</h3>
        <ul>
          { country.languages.map(lang => <li key={lang.name}>{lang.name}</li>) }
        </ul>
        <img src={country.flag} alt={country.name} height="200" width="300" />
        <Weather country={country} />
    </div>
  )
}

export default Country
