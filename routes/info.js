const express = require('express');
const mdb = require('moviedb')('785128e1bd19a03ab1bee95dd3dc52dd');
const path = require('path');
const route = express.Router();

route.get('/movie', (req, res) => {
  mdb.movieInfo({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_credits', (req, res) => {
  mdb.movieCredits({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_image', (req, res) => {
  mdb.movieImages({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_video', (req, res) => {
  mdb.movieVideos({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_similar', (req, res) => {
  mdb.movieSimilar({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv', (req, res) => {
  mdb.tvInfo({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv_credits', (req, res) => {
  mdb.tvCredits({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv_video', (req, res) => {
  mdb.tvVideos({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv_image', (req, res) => {
  mdb.tvImages({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv_similar', (req, res) => {
  mdb.tvSimilar({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.use('/', express.static(path.join(__dirname, '../public_static')));

exports.route = route;