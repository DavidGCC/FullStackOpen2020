import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
    fragment bookDetails on Book {
        title
        published
        genres
        author {
            name
            born
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
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
            ...bookDetails
        }
    }
    ${BOOK_DETAILS} 
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
            user {
                username
                favoriteGenre
            }
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
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;