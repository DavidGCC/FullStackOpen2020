require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let resultBooks;
            // if (!args.author) {
            //     resultBooks = Book.find().populate('author');
            // } else {
            //     resultBooks = books.filter(book => book.author === args.author);
            // }
            if (!args.genre) {
                return await Book.find().populate('author');
            }
            return Book.find({ "genres" : { $in: args.genre } }).populate('author');
        },
        allAuthors: () => Author.find()
    },
    Author: {
        // bookCount: (root) => {
        //     return Book == root.name).length
        // }
    },
    Mutation: {
        addBook: async (root, args) => {
            try {
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
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        editAuthor: async (root, args) => {
            let authorToUpdate = await Author.findOne({name: args.name})
            if (authorToUpdate) {
                authorToUpdate.born = args.setBornTo;
                return await authorToUpdate.save();
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