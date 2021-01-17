import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../Queries';

const Books = (props) => {
    const { loading, error, data } = useQuery(ALL_BOOKS);
    if (!props.show) {
        return null
    }
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.log(error);
    }

    const books = data.allBooks;
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
        </div>
    )
}

export default Books