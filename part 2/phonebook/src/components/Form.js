import React from "react";

const Form = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" value={props.nameValue} onChange={props.handleNameChange}></input>
            </div>
            <div>
                <label htmlFor="number">Phone Number: </label>
                <input tpye="text" value={props.numberValue} onChange={props.handleNumberChange}></input>
            </div>
            <div>
                <button>Add</button>    
            </div>
        </form>
    )
}

export default Form;