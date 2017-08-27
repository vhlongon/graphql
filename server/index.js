const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const chalk = require('chalk');

const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen('4000', () => {
  console.log(
    chalk.bgWhite.bold.red('GraphQL server listening on http://localhost:4000')
  );
});
