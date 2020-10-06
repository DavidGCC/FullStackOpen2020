import React from "react";


const Display = props => {

    return (
        <div>
            {props.persons.map((it) => <p key={it.name}>{it.name} {it.number}</p>)}
        </div>
    )

}


export default Display;