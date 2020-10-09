import axios from "axios";
import React, { useEffect, useState } from "react";



const Country = ( {value} ) => {

    const [ weatherData, setWeather ] = useState({});
    const [ weatherIcon, setWeatherIcon ] = useState("");

    value = value[0];

    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${value.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            console.log(res.data);
            setWeather(res.data);
            setWeatherIcon(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
        })
        .catch(err => {
            setWeather("404")
        })
    }, [])
    

    return (
        <div>
            <h1>{value.name}</h1>
            <p>Capital: {value.capital}</p>
            <p>Population: {value.population}</p>
            <h2>Languages</h2>
            <ul>
                {value.languages.map(i => <li key={i.name}>{i.name}</li>)}
            </ul>
            <img src={value.flag} alt="country flag" style={{width: 300, height: "auto"}}/>
            <h2>Weather in <b>{value.capital}</b></h2>
            {weatherData === "404" ? <p>No weather data for the specified capital</p> : Object.keys(weatherData).length === 0 ? <p>Loading Data...</p> : (
            <div>
                <p><b>Temperature</b> {Math.floor(weatherData.main.temp)}C</p>
                <img src={weatherIcon} alt="Weather Icon" />
                <p><b>Wind</b> {weatherData.wind.speed} mps <b>Direction</b> {weatherData.wind.deg}°</p>
            </div>
            )}
            
        </div>
    )

}

export default Country;