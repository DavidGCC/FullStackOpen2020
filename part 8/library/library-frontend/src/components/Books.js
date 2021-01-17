import React from 'react'

const Books = ({show, result}) => {
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
    // const genres = [...new Set(books.map(book => book.genres).flat())];
    return (
        <div>
            <h2>books</h2>

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
            <div>
            </div>
        </div>
    )
}

export default Books