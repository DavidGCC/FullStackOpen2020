import React from "react";


const Search = ({ value, handleChange }) => {

    return (
        <div>
            <label htmlFor="query">Enter query: </label>
            <input type="text" value={value} onChange={handleChange}></input>
        </div>
    )
}

export default Search;