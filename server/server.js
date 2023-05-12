const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        //* options here
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log(`Listening to PORT 4000 successfully ...`);
    console.log(`http://localhost:4000/graphql`);
});
