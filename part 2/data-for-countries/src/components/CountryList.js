import React, { useState } from "react";
import Country from "./Country";

const CountryList = ({countries}) => {

    const [ toggleView, setView ] = useState(false);
    const [ countryToShow, setCountry ] = useState("");

    const handleClick = (name) => {
        if (name.toLowerCase() !== countryToShow) {
            setView(true);
        } else {
            setView(!toggleView);
        }
        setCountry(name.toLowerCase());
    }
    return (
        <div>
            {countries.map(i => {

                    return (
                        <div key={i.name + "DIV"}>
                            <p key={i.name}>{i.name} <button key={i.name + "BUTTON"} onClick={() => handleClick(i.name)}>{toggleView && countryToShow === i.name.toLowerCase() ? "Hide" : "Show"}</button></p>
                            {toggleView && countryToShow === i.name.toLowerCase()  && <Country value={[i]}/>}
                        </div>
                    );

                }
            )}
        </div>
    )
}


export default CountryList;