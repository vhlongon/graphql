const { user, password } = require('./secret');

module.exports = {
  server: {
    port: 3000,
    browserSyncPort: 3002,
    browserSyncUiPort: 4003,
  },
  db: {
    user,
    password,
  },
  gql: {
    port: 4000,
    path: '/graphql',
    root: 'http://localhost',
  },
};
