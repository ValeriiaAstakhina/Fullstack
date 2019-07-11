import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  return(
    <form >
    <div>
      find countries: <input  
              value={props.toShow}              
              onChange={props.handleSearch}
              />
    </div>
  </form>
  )
}

const Language = (props) => {
  return (
    <li>
        {props.language.name}
    </li>
    )
}
const Languages = (props) => {
        
  const rows = () => props.languages.map(language => 
    <Language 
            key={language.name}
           language={language}
        />
  )

  return (
    <div>
      <h2>Languages:</h2>
        {rows()}
    </div>
)
    
}
const CountryName = (props) => {

  const handleClick = () => {
    props.setToShow(props.name)
  }

  return(
  <div>
    {props.name}
    <button onClick={handleClick}>
      show
    </button>
  </div>
  )
}

const CountryFull = (props) => {
  props.setCapital(props.capital)

  return(
  <div>
    <h1>{props.name}</h1>
    <p>Capital {props.capital}</p>
    <p>Population {props.population}</p>
    <Languages languages={props.languages}/>
    <img src={props.flag} alt="Flag" width="200px" />
    <h1>Weather in {props.capital}</h1>
    {
      props.weather.current
      ? (
        <div>
          <p>temperature: {props.weather.current.temp_c} Celcius</p>
          <img src={props.weather.current.condition.icon} alt="Weather" width="200px" />
          <p>wind: {props.weather.current.wind_kph} kph, direction {props.weather.current.wind_dir}</p>
        </div>
      )
      : (
        <h1>Loading...</h1>
      )
    }
    
  </div>
  )

}


const Show = (props) => {
  return( 
    props.toShow === ''
    ? <p></p>
    : props.filtered.length > 10
    ? <p>Too many matches, specify another filter</p>
    : props.filtered.length === 1
    ? props.filtered.map(country => 
      <CountryFull
        key={country.name}        
        name={country.name} 
        capital={country.capital}   
        population={country.population} 
        flag={country.flag} 
        languages={country.languages}
        weather={props.weather}
        setCapital={props.setCapital}
      />)
    : props.filtered.map(country => 
    <CountryName
      key={country.name}
      name={country.name}  
      setToShow={props.setToShow} 
    />)    
  )
}

function App() {

  const [ toShow, setToShow] = useState('')
  const [ countries, setCountries] = useState([]) 
  const [ weather, setWeather ] = useState({})
  const [ capital, setCapital] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise countries fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

 
  const handleSearch = (event) => {   
    setToShow(event.target.value)
  }
  
  const filtered = countries.filter(country => country.name.toLowerCase().includes(toShow.toLowerCase()))

  useEffect(() => {
    let getWeather = "http://api.apixu.com/v1/current.json?key=fd2ccc347f2a4f589fe181626190407&q="

    if (capital.length > 0)
    {
    getWeather += capital
    console.log('effect')
    axios
      .get(getWeather)
      .then(response => {
        setWeather(response.data)
      })
    }
  }, [capital])


  
  return (
    <div>
    <div>
      <Search toShow={toShow} handleSearch={handleSearch}/>
    </div>
    <div>
      <Show filtered={filtered} toShow={toShow} setToShow={setToShow} weather={weather} setCapital={setCapital}/>
    </div>
    </div>
  );
}

export default App;
