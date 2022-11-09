const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// const pg = require('pg');
// const Pool = pg.Pool;
// const pool = new Pool({
//   database: 'music_library', // name of database
//   host: 'localhost', // database server
//   port: 5432, // Postgres default
//   max: 10, // max queries at once
//   idleTimeoutMillis: 30000 // 30 seconds to try to connect before cancelling query
// });

// // not required, but useful for debugging:
// pool.on('connect', () => {
//   console.log('postgresql is connected! shout out node');
// });

// pool.on('error', (error) => {
//   console.log('epic fail in postgres pool.', error);
// })

// let songs = [
//   {
//     rank: 355,
//     artist: 'Ke$ha',
//     track: 'Tik-Toc',
//     published: '1/1/2009'
//   },
//   {
//     rank: 356,
//     artist: 'Gene Autry',
//     track: 'Rudolph, the Red-Nosed Reindeer',
//     published: '1/1/1949'
//   },
//   {
//     rank: 357,
//     artist: 'Oasis',
//     track: 'Wonderwall',
//     published: '1/1/1996'
//   }
// ];

router.get('/', (req, res) => {

  let queryText = `SELECT * FROM songs ORDER BY rank`;

  pool.query(queryText)
    .then((result) => {
      console.log('result.rows:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.group('Error in GET query')
      console.log(`Query: ${queryText}`);
      console.log(`Error: ${error}`);
      console.groupEnd();
      res.sendStatus(500);
    })

});

router.post('/', (req, res) => {
  // songs.push(req.body);
  // res.sendStatus(200);

  const newSong = req.body;
  // parameterized query
  const queryText = `
    INSERT INTO songs (artist, track, published, rank)
    VALUES ($1, $2, $3, $4)
  `;

  pool.query(queryText, [newSong.artist, newSong.track, newSong.published, newSong.rank])
    .then((result) => {
      console.log('POST result from db:', result)
      res.sendStatus(201)
    })
    .catch((error) => {
      console.group('error in post query:')
      console.log('query:', queryText)
      console.log('error:', error)
      console.groupEnd();
      res.sendStatus(500)
    })
});

module.exports = router;