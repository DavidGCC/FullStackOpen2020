import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    const course = {
        name: "Half stack application developement",
        parts: [ 
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }


    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}
const Header = props => {
    return (
        <h1>{props.course}</h1>
    )
}
const Content = props => {
    const [p1, p2, p3] = props.parts;
    const {name: partName1, exercises: exercises1} = p1; 
    const {name: partName2, exercises: exercises2} = p2; 
    const {name: partName3, exercises: exercises3} = p3; 
    return (
        <div>
            <Part part={partName1} exercise={exercises1} />
            <Part part={partName2} exercise={exercises2} />
            <Part part={partName3} exercise={exercises3 } />
        </div>
        )
}
const Total = props => {
    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}
const Part = props => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

ReactDOM.render(<App />,  document.getElementById('root'));
