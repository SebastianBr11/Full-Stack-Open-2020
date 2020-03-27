import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Weather = ({country = null}) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log(api_key)
    console.log(country.capital)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(res => {
        setWeather(res.data.current);
      })
  }, [])

  return (
    <div>
      {weather ? 
        <>
          <h2>Weather in {country.capital}</h2>
          <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
          {weather.weather_icons ? <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} /> : "Loading..."}
          {console.log(weather)}
          <p><strong>wind:</strong> {weather.wind_speed} km/h direction {weather.wind_dir}</p>
        </>
      : <p>Loading...</p>
        
      }
      
    </div>
  )
}

export default Weather
