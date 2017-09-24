const { user, password, encryptSecret } = require('./secret');

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
  encryptSecret,
  gql: {
    port: 4000,
    path: '/graphql',
    root: 'http://localhost',
  },
};
