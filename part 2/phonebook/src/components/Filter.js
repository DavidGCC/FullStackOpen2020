import React from "react";


const Filter = props => {
    return (
        <div>
            <label htmlFor="filterBar">Filter by Name</label>
            <input value={props.value} onChange={props.handleChange} />
        </div>
    )
}

export default Filter;