import { gql } from '@apollo/client';


export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            genres
            author {
                name
            }
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            published
            genres
            author {
                name
                born
            }
        }
    } 
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $year: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $year
        ) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`;

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`;

export const BOOKS = gql`
    query getBooks($genre: String!) {
        allBooks(genre: $genre) {
            title
            published
            genres
            author {
                name
            }
        }
    }
`;