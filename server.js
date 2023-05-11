const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        //* options here
        schema,
        graphiql: true,
    })
);

app.listen(3000, () => {
    console.log(`Listening to PORT 3000 successfully ...`);
    console.log(`http://localhost:3000/graphql`);
});
