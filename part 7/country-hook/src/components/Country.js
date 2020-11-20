import React from 'react'


const Country = ({ country }) => {
    if (!country) {
        return null
    }
    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.data[0].name} </h3>
            <div>capital {country.data[0].capital} </div>
            <div>population {country.data[0].population}</div>
            <img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`} />
        </div>
    )
}

export default Country