import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    const course = "Half stack application developement";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;


    return (
        <div>
            <Header courseName={course} />
            <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
            <Total total={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}
const Header = props => {
    return (
        <h1>{props.courseName}</h1>
    )
}
const Content = props => {
    const [p1, p2, p3] = props.parts;
    const [e1, e2, e3] = props.exercises;

    return (
        <div>
            <Part part={p1} exercise={e1} />
            <Part part={p2} exercise={e2} />
            <Part part={p3} exercise={e3} />
        </div>
        )
}
const Total = props => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}
const Part = props => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

ReactDOM.render(<App />,  document.getElementById('root'));
