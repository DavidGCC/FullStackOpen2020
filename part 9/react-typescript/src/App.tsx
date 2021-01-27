import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import { CoursePart } from "./Types";

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "htts://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "State handling",
            exerciseCount: 13,
            description: "A part added by me"
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;
