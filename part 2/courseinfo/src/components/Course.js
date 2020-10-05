import React from "react";
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";


const Course = props => {
    
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )

}

export default Course;