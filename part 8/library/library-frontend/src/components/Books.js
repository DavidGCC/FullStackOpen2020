import React from 'react'
import Filter from './Filter';

const Books = ({show, result, genres, filter, setFilter}) => {
    if (!show) {
        return null
    }
    if (result.loading) {
        return <div>Loading...</div>
    }
    if (result.error) {
        console.log(result.error);
    }
    
    const books = result.data.allBooks;
    return (
        <div>
            <h2>books</h2>
            <p>in genre <b>{filter ? filter : "All Genres"}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <Filter genres={genres} filter={filter} setFilter={setFilter}/>
        </div>
    )
}

export default Books