import { gql } from '@apollo/client';

//* Making request to GraphQL server
const GET_BOOKS = gql`
    query RootQueryType {
        books {
            id
            name
            genre
            author {
                name
            }
        }
    }
`;

const GET_AUTHORS = gql`
    query RootQueryType {
        authors {
            name
            id
        }
    }
`;

//* Making Mutation request to GraphQL server
const ADD_BOOK = gql`
    mutation Mutation($authorID: ID!, $name: String!, $genre: String!, $id: ID!) {
        addBook(authorID: $authorID, name: $name, genre: $genre, id: $id) {
            name
            genre
        }
    }
`;

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK };
