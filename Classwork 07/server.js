import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

const schema = buildSchema(`
  type Query {
    name: String
  }
`);

const root = {
  hello: () => "Hello world",
  name: () => "This is Vitesh"
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

const port = 3000;

app.listen(port, () => {
  console.log(`GraphQL server running at http://localhost:${port}/graphql`);
});