import { ApolloClient, InMemoryCache } from '@apollo/client';

//* Apollo Setup
export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});
