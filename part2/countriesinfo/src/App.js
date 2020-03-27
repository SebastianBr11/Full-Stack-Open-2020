import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Country from './components/Country';
import CountryList from './components/CountryList';

function App() {
  const [search, setSearch] = useState("")
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const match = new RegExp(search, "gi")

    axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => res.data)
      .then(data => data.filter(i => {
        return i.name.match(match);
      }))
      .then(matches => setMatches(matches));
      console.log(matches);
  }, [search])

  let matchesToDisplay;

  if (matches.length === 1) {
    matchesToDisplay = matches.map(match => (
      <Country key={match.numericCode} country={match} />
    ))
  } else if (matches.length <= 10 ) {
    matchesToDisplay = <CountryList countries={matches}/>
  } else  {
    matchesToDisplay = <p>Too many matches, specify another filter</p>
  };

  return (
    <div>
      <form>
        <label htmlFor="search">find countries</label>
        <input type="text" value={search} name="search" onChange={e => setSearch(e.target.value)} />
      </form>
      { matchesToDisplay }
    </div>
  );
}

export default App;
