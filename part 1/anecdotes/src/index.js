import React, { useState } from "react";
import ReactDOM from "react-dom";


const App = props => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

    const handleNextClick = () => {
        let random = Math.floor(Math.random() * props.anecdotes.length);
        setSelected(random);
    }

    const handleVoteClick = () => {
        let newVotes = [...votes];
        newVotes[selected]++;
        setVotes(newVotes);
    }
    var mostVoted = props.anecdotes[votes.indexOf(votes.reduce((a, b) => {
        return Math.max(a, b);
    }))];

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>This anecdote has {votes[selected]} Votes</p>
            <button onClick={handleVoteClick} name="voteAnecdote">Vote</button>
            <button onClick={handleNextClick} name="getNewAnecdote">Next Anecdote</button>
            <h1>Anecdote with the most votes</h1>
            <p>{mostVoted}</p>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));