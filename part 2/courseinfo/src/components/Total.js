import React from "react";


const Total = props => {
    let totalExercises = props.parts.reduce((acc, it) => {
        return acc + it.exercises;
    }, 0)
    return (
        <h3>Total of {totalExercises} exercises</h3>
    )
}

export default Total;