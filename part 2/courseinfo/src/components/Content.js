import React from "react";
import Part from "./Part";


const Content = props => {
    return (
        props.parts.map((it) => <Part key={it.id} part={it.name} exercise={it.exercises} />)
    )
    
}

export default Content;