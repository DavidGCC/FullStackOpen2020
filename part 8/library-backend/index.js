require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./Models/Book');
const Author = require('./Models/Author');

mongoose.connect(process.env.MONGODB_URL, {useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true})
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error(err);
    })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Book {
        title: String!
        published: Int
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int!,
            genres: [String!]
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            var resultBooks;
            if (!args.author) {
                resultBooks = books;
            } else {
                resultBooks = books.filter(book => book.author === args.author);
            }
            if (!args.genre) {
                return resultBooks;
            }
            return resultBooks.filter(book => book.genres.includes(args.genre));
        },
        allAuthors: () => authors
    },
    Author: {
        bookCount: (root) => {
            return books.filter(book => book.author == root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({'name': args.author});
            let newBook;
            if (!author) {
                const author = new Author({
                    name: args.author
                });
                await author.save();
            }
            newBook = new Book({...args, author: author._id});
            await newBook.save();
            return Book.populate(newBook, {path: "author"})
        },
        editAuthor: (root, args) => {
            let authorToUpdate = authors.find(author => author.name === args.name);
            if (authorToUpdate) {
                let updatedAuthor = {...authorToUpdate, born: args.setBornTo};
                authors = authors.map(author => author.name === authorToUpdate.name ? {...updatedAuthor} : {...author});
                return updatedAuthor;
            }
            return null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})