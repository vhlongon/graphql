const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const { db, gql, encryptSecret } = require('../config');

// Create a new Express application
const app = express();

// mongoLab URI
const MONGO_URI = `mongodb://${db.user}:${db.password}@ds157833.mlab.com:57833/graphql-auth`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
const mongoOptions = {
  useMongoClient: true,
};

const connection = mongoose.connect(MONGO_URI, mongoOptions);
connection
  .once('open', () =>
    console.log(chalk.bgWhite.bold.red('Connected to MongoLab instance.')),
  )
  .on('error', error =>
    console.log(chalk.bgRed.bold.white('Error connecting to MongoLab:', error)),
  )
  .on('disconnected', () => {
    // Reconnect on timeout
    console.log(chalk.bgWhite.bold.red('Re-reconnecting to MongoLab.'));
    mongoose.connect(MONGO_URI, mongoOptions);
  });

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: encryptSecret,
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  }),
);

app.use(cors());

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  gql.path,
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

app.listen(gql.port, () => {
  console.log(
    chalk.bgWhite.bold.blue(
      `GraphQL listening on: ${`${gql.root}:${gql.port}${gql.path}`}`,
    ),
  );
  console.log(
    chalk.bgWhite.bold.blue(
      `GraphiQL enabled, running at: ${gql.root}:${gql.port}${gql.path}`,
    ),
  );
});
