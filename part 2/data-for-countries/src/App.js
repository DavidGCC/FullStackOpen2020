import React, { useEffect, useState } from 'react';

function App() {

    const [ countries, setCountries ] = useState([]);
    const [ query, setQuery ] = useState("");

    const handleChange = event => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setCountries(data);
        })
    }, []);

    let filteredCountries = query === "" ? countries : countries.filter(it => {
        it.name.includes(query);
    })

  return (
    <div>
        <h1>Find Country</h1>
        <label htmlFor="country">Enter query: </label>
        <input type="text" value={query} onChange={handleChange}></input>
        <div>
            <p>COUNTRIES HERE</p>
        </div>
    </div>
  );
}

export default App;
