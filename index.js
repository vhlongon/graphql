const chalk = require('chalk');
const app = require('./server');
const { server } = require('./config');

app.listen(server.port, () => {
  console.log(
    chalk.bgWhite.bold.blue('GraphQL listening on: http://localhost:4000')
  );
});
