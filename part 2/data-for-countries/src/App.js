import React, { useEffect, useState } from 'react';
import axios from "axios";
import Search from "./components/Search";
import Country from "./components/Country";
import CountryList from "./components/CountryList"
function App() {

    const [ countries, setCountries ] = useState([]);
    const [ query, setQuery ] = useState("");

    const TOO_MANY_SEARCHES = <p>Too many matches, Please be more specific.</p>;
    useEffect(() => {
        axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(res => setCountries(res.data))
    }, []);


    const handleChange = event => setQuery(event.target.value);

    let filtered = query == "" ? countries : countries.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    let displayToShow = "";
    if (filtered.length == 1) {
        displayToShow = <Country value={filtered} />
    } else if (filtered.length <= 10) {
        displayToShow = <CountryList countries={filtered} />
    } else {
        displayToShow = TOO_MANY_SEARCHES;
    }
  return (
    <div>
        <h1>Find Country</h1>
        <Search value={query} handleChange={handleChange} />
        {displayToShow}
    </div>
  );
}

export default App;
