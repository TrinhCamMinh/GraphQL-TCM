const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID: '1' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorID: '2' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorID: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorID: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorID: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorID: '3' },
];

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This is all the properties which belong to BookType Schema',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //* The parent value is the returning value in the RootQuery
                //* For instance, in this case the book in RootQuery return a books array
                //* So the parent here is that returned book array
                return _.find(authors, { id: parent.authorID });

                //! if we use database
                //* return Author.findById(parent.authorID)
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This is all the properties which belong to Author Schema',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorID: parent.id });

                //! if we use database
                //* return Books.find(authorID: {parent.id})
            },
        },
    }),
});

//* This is only used for mutation with database (CRUD)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'CRUD with database using this query',
    fields: {
        addAuthor: {
            type: AuthorType,
            description: 'Add new Author to database',
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                authors.push({
                    name: args.name,
                    age: args.age,
                    id: args.id,
                });
                return _.find(authors, { id: args.id });
            },
        },
        addBook: {
            type: BookType,
            description: 'Add new Book to database',
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorID: { type: GraphQLID },
            },
            resolve(parent, args) {
                books.push({
                    name: args.name,
                    genre: args.genre,
                    id: args.id,
                    authorID: args.authorID,
                });
                return _.find(books, { id: args.id });
            },
        },
    },
});

//* This is only used for query data (receive data from database)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'This is initially query route',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
            },
            description: 'find specific book base on ID',
            resolve(parent, args) {
                //* The ID type --> String type automatically in this resolve function
                // console.log(typeof args.id);
                return _.find(books, { id: args.id });
            },
        },

        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
            },
            description: 'find specific author base on ID',
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            },
        },

        books: {
            type: new GraphQLList(BookType),
            description: 'find all the book available in database',
            resolve(parent, args) {
                return books;
            },
        },

        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List all the Authors in the database',
            resolve(parent, args) {
                return authors;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
