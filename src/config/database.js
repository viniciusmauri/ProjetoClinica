module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'clinic',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
