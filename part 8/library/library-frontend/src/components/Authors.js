import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../Queries';

const Authors = ({show, result}) => {
    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    });
    const [ year, setYear ] = useState('');
    const [ name, setName ] = useState('');
    if (!show) {
        return null
    }
    if (result.error) {
        console.log(result.error);
    }
    if (result.loading) {
        return <div>Loading...</div>
    }
    const handleSubmit = e => {
        e.preventDefault();
        editAuthor({ variables: {name, year} });

        setYear('');
        setName('');
    }
    const authors = result.data.allAuthors;

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
            </th>
                        <th>
                            books
            </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h3>Set Birthyear</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                    {
                        authors.map(author => <option key={author.name}>{author.name}</option>)
                    }
                </select>
                <br />
                <label htmlFor="year">Set Year To</label>
                <input type="number" value={year} onChange={({ target }) => setYear(Number(target.value))}></input>
                <br />
                <button>Edit</button>
            </form>

        </div>
    )
}

export default Authors
