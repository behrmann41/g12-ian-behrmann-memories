var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://@localhost/memoriesapp";
var schema = require('../lib/data-schema.js')

router.post('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1,$2,$3)',[req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log("connected to database")
      res.status(200).end()
    });

  });
});

router.get('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from memories', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(schema.formatRes(result.rows)).status(200).end()
    });

  });
});

router.get('/api/v1/memories/:year', function (req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from memories where year = $1',[req.params.year], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(schema.formatRes(result.rows)).status(200).end()
    });

  });
})



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
