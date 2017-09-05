const express = require('express');
const chalk = require('chalk');
const models = require('./models'); // eslint-disable-line
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const { db } = require('../config');

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
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
