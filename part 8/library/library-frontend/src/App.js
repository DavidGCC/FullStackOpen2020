import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);
    const client = useApolloClient();

    useEffect(() => {
        if (localStorage.getItem('currentUserToken')) {
            setToken(localStorage.getItem('currentUserToken'));
        }
    })

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
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : <button onClick={() => setPage('login')}>Login</button>}
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
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