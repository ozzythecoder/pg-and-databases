const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
  database: 'music_library', // name of database
  host: 'localhost', // database server
  port: 5432, // Postgres default
  max: 10, // max queries at once
  idleTimeoutMillis: 30000 // 30 seconds to try to connect before cancelling query
});

// not required, but useful for debugging:
pool.on('connect', () => {
  console.log('postgresql is connected! shout out node');
});

pool.on('error', (error) => {
  console.log('epic fail in postgres pool.', error);
})

module.exports = pool;