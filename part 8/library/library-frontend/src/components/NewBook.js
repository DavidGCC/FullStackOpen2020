import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS } from '../Queries';

const NewBook = (props) => {
    const [ addBook ] = useMutation(ADD_BOOK);
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        addBook({ variables: { title, author, published, genres }, refetchQueries: [ { query: ALL_AUTHORS } ] })

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
          <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
          <input
                        value={author}
                        onChange={({ target }) => setAuhtor(target.value)}
                    />
                </div>
                <div>
                    published
          <input
                        type='text'
                        value={published}
                        onChange={({ target }) => setPublished(Number(target.value))}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook