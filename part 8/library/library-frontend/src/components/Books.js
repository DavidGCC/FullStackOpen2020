import React from 'react'

const Books = ({show, result}) => {
    const [filter, setFilter] = React.useState();
    if (!show) {
        return null
    }
    if (result.loading) {
        return <div>Loading...</div>
    }
    if (result.error) {
        console.log(result.error);
    }

    const handleFilter = e => {
        setFilter(e.target.value);
    }
    
    const books = filter ? result.data.allBooks.filter(book => book.genres.includes(filter)) : result.data.allBooks;
    const genres = [...new Set(result.data.allBooks.map(book => book.genres).flat())];
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
            <div>
                {
                    genres.map(genre => <button key={genre} onClick={handleFilter} value={genre}>{genre}</button>)
                }
                <button onClick={() => setFilter('')}>All Genres</button>
            </div>
        </div>
    )
}

export default Books