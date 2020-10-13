import React from "react";


const Display = ({persons, handleDeleteClick}) => {

    return (
        <div>
            {persons.map((it)=> <p key={it.name}>{it.name} {it.number} <button onClick={() => handleDeleteClick(it.id)}>Delete</button></p>)}
        </div>
    )

}


export default Display;