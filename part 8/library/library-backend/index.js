require('dotenv').config();
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./Models/Book');
const Author = require('./Models/Author');
const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const pubSub = new PubSub();

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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
        user: User!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        allGenres: [String!]!
    }

    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int!,
            genres: [String!]
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
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
        allAuthors: () => Author.find(),
        me: (root, args, context) => context.currentUser,
        allGenres: async () => {
            const books = await Book.find();
            const genres = books.map(book => book.genres);
            const flattenedGenres = genres.flat();
            const uniqueGenres = new Set(flattenedGenres);
            return uniqueGenres;
        }
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root })
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            let newBook;
            if (!currentUser) {
                throw new AuthenticationError('not authenticated');
            }
            try {
                const author = await Author.findOne({'name': args.author});
                if (!author) {
                    const newAuthor = new Author({
                        name: args.author
                    });
                    await newAuthor.save();
                    newBook = new Book({...args, author: newAuthor._id});
                } else {
                    newBook = new Book({...args, author: author._id});
                }
                await newBook.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            const response = await Book.populate(newBook, {path: "author"});
            pubSub.publish('BOOK_ADDED', { bookAdded: response });
            return response;
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated');
            }
            let authorToUpdate = await Author.findOne({name: args.name})
            if (authorToUpdate) {
                authorToUpdate.born = args.setBornTo;
                return await authorToUpdate.save();
            }
            return null
        },
        createUser: async (root, args) => {
            const user = new User({username: args.username, favoriteGenre: args.favoriteGenre});

            return await user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secretpassword') {
                throw new UserInputError('wrong credentials');
            }

            const token = {
                username: user.username,
                id: user._id
            }

            return {value: jwt.sign(token, process.env.JWT_SECRET), user};
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = User.findById(decodedToken.id);
            return { currentUser }
        }
    }
})
// mongoose.set("debug", (collectionName, method, query, doc) => {
//     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscription readt a ${subscriptionsUrl}`);
})