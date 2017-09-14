const path = require('path');
const express = require('express');
const chalk = require('chalk');
const models = require('./models'); // eslint-disable-line
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schema/schema');
const { db, server, gql } = require('../config');

const app = express();

// mongoLab URI
const MONGO_URI = `mongodb://${db.user}:${db.password}@ds123124.mlab.com:23124/graphql-app`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () =>
    console.log(chalk.bgWhite.bold.red('Connected to MongoLab instance.'))
  )
  .on('error', error =>
    console.log(chalk.bgRed.bold.white('Error connecting to MongoLab:', error))
  );

app.use(bodyParser.json());
// app.get('*', (req, res) => {
//   res.sendFile(
//     path.resolve(`${path.dirname(require.main.filename)}/dist/index.html`)
//   );
// });

app.use(cors());
app.use(
  gql.path,
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(gql.port, () => {
  console.log(
    chalk.bgWhite.bold.blue(
      `GraphQL listening on: ${`${gql.root}:${gql.port}${gql.path}`}`
    )
  );
  console.log(
    chalk.bgWhite.bold.blue(
      `GraphiQL enabled, running at: ${gql.root}:${gql.port}${gql.path}`
    )
  );
});
