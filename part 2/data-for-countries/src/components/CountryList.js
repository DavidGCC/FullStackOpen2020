import React from "react";


const CountryList = ({countries}) => {

    return (
        <div>
            {countries.map(i => <p key={i.name}>{i.name}</p>)}
        </div>
    )
}


export default CountryList;