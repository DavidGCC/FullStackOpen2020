import React, { useEffect } from "react";



const Country = ( {value} ) => {
    value = value[0];
    console.log(value);
    return (
        <div>
            <h1>{value.name}</h1>
            <p>Capital: {value.capital}</p>
            <p>Population: {value.population}</p>
            <h3>Languages</h3>
            <ul>
                {value.languages.map(i => <li key={i.name}>{i.name}</li>)}
            </ul>
            <img src={value.flag} style={{width: 300, height: "auto"}}/>
        </div>
    )

}

export default Country;