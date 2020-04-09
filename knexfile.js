module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/budget.db3', //ensure points to root of repo.
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
