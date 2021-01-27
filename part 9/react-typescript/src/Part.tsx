import React from "react";
import { CoursePart, assertNever } from "./Types";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>description: {part.description}</p>
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>group project count: {part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>description: {part.description}</p>
                    <p>exercise submission link: {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "State handling":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>description: {part.description}</p>
                </div>
            )
        default:
            return assertNever(part);
    }
};

export default Part;
