import React from 'react'
import CountryListItem from './CountryListItem';

const CountryList = ({countries}) => {
  return (
    <div>
      {countries.map(country => (
        <CountryListItem key={country.name} country={country} />
      ))}
      </div>
    );
}

export default CountryList
