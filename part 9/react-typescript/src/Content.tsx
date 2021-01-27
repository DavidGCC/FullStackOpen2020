import React from "react";
import Part from "./Part";
import { CoursePart } from "./Types";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(part => (
                <Part key={part.name} part={part} />
            ))}
        </div>  
    );
};

export default Content;
