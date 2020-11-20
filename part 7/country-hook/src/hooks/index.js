import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (name !== '') {
            axios
                .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                .then(data => {
                    setCountry({...data, found: 1})
                })
                .catch(err => {
                    err.response.status === 404 ? setCountry({ found: 0 }) : console.error(err);
                })
        }
    }, [name])

    return country
}