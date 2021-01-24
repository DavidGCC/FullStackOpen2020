import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { BOOKS } from '../Queries';


const Recommended = ({ show, favGenre }) => {
    const [getBooks, result] = useLazyQuery(BOOKS);
    React.useEffect(() => {
        getBooks({ variables: { "genre": favGenre }});
    }, [favGenre]); //eslint-disable-line
    if (!show) {
        return null;
    }
    if (result.loading) {
        return <div>Loading...</div>
    }
    const books = result.data.allBooks;
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <b>{favGenre}</b></p>
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