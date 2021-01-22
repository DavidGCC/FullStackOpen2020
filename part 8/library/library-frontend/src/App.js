import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended';
import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client';
import { ALL_AUTHORS, BOOKS, ME, ALL_GENRES } from './Queries';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);
    const [getBooks, books] = useLazyQuery(BOOKS);
    const [filter, setFilter] = useState('');
    const genres = useQuery(ALL_GENRES);
    const authors = useQuery(ALL_AUTHORS);
    const user = useQuery(ME);
    const client = useApolloClient();

    useEffect(() => {
        if (localStorage.getItem('currentUserToken')) {
            setToken(localStorage.getItem('currentUserToken'));
        }
    }, [])

    useEffect(() => {
        getBooks({ variables: { "genre": filter } })
    }, [filter]); //eslint-disable-line

    const handleLogout = (e) => {
        e.preventDefault();
        setToken(null);
        localStorage.clear();
        client.resetStore();
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? (
                    <>
                        <button onClick={() => setPage('recommended')}>Recommended</button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : <button onClick={() => setPage('login')}>Login</button>}
            </div>

            <Authors
                show={page === 'authors'}
                result={authors}
            />

            <Recommended
                show={page === 'recommended'}
                user={user} />

            <Books
                show={page === 'books'}
                result={books}
                genres={genres}
                filter={filter}
                setFilter={setFilter}
            />

            <NewBook
                show={page === 'add'}
            />

            <Login 
                show={page === 'login'}
                setToken={setToken}
            />

        </div>
    )
}

export default App