import React from 'react';


const Recommended = ({ show, result, user }) => {
    if (!show) {
        return null;
    }
    if (result.loading || user.loading) {
        return <div>Loading...</div>
    }
    const books = result.data.allBooks.filter(book => book.genres.includes(user.data.me.favoriteGenre));
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
            <br />
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
        </div>
    )

}

export default Recommended;