import React from "react";


const Notification = ({message}) => {
    const { type, text } = message;
    const errorStyle = {
        color: "red",
        backgroundColor: "#ed8e8e",
        border: "1px solid red",
        fontSize: "2rem",
        width: "fit-content"
    }
    const successStyle = {
        color: "green",
        backgroundColor: "#eaffc2",
        border: "1px solid green",
        fontSize: "2rem",
        width: "fit-content"
    }

    return (
        <p style={type === "error" ? errorStyle : successStyle}>{text}</p>
    )

}

export default Notification;