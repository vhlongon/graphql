module.exports = wallaby => ({
  files: ['client/**/*.js*', 'client/**/*.js*', '!client/**/__tests__/*.js*'],
  tests: ['client/**/__tests__/*.js*'],
  compilers: {
    'client/**/*.js*': wallaby.compilers.babel(),
  },
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
});
