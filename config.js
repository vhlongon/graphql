const { user, password } = require('./secret');

module.exports = {
  server: {
    port: 4000,
    browserSyncPort: 4001,
    browserSyncUiPort: 4002,
  },
  db: {
    user,
    password,
  },
};
