import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const [goodVotes, setGoods] = useState(0);
    const [neutralVotes, setNeutrals] = useState(0);
    const [badVotes, setBads] = useState(0);

    const handleClick = (event) => {
        const {name} = event.target;
        if (name === "Good") {
            setGoods(goodVotes + 1);
        } else if (name === "Neutral") {
            setNeutrals(neutralVotes + 1);
        } else {
            setBads(badVotes + 1);
        }
    
    }


    return (
        <div>
            <h1>Give Feedback</h1>
            <h3>Votes</h3>
            <Button text={"Good"} handleClick={handleClick} />
            <Button text={"Neutral"} handleClick={handleClick} />
            <Button text={"Bad"} handleClick={handleClick} />
            <h2>Collected Feedback</h2>
            {(goodVotes + badVotes + neutralVotes) > 0 ? <Statistics goods={goodVotes} neutrals={neutralVotes} bads={badVotes} /> : <p>No Feedback Given</p>}
        </div>
    )

}

const Button = ({text, handleClick}) => {
    return (
        <button name={text} onClick={handleClick}>{text}</button>
    )
} 

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text} {value}</td>
        </tr>
    )
}

const Statistics = ({goods, neutrals, bads}) => {
    return (
        <table>
            <tbody>
                <Statistic text={"Good"} value={goods} />
                <Statistic text={"Neutral"} value={neutrals} />
                <Statistic text={"Bad"} value={bads} />
                <Statistic text={"Total Votes"} value={goods + bads + neutrals} />
                <Statistic text={"Average Votes"} value={(goods - bads) / (goods + bads + neutrals)} />
                <Statistic text={"Percentage of Positive Votes"} value={(goods / (goods + bads + neutrals))*100 + "%"} />
            </tbody>
        </table>
    )

}


ReactDOM.render(<App />, document.getElementById("root"));
