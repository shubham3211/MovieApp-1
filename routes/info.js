const express = require('express');
const mbd = require('moviedb')('785128e1bd19a03ab1bee95dd3dc52dd');
const path = require('path');
const route = express.Router();

route.get('/movie', (req, res) => {
  mbd.movieInfo({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_credits', (req, res) => {
  mbd.movieCredits({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_image', (req, res) => {
  mbd.movieImages({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_video', (req, res) => {
  mbd.movieVideos({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/movie_similar', (req, res) => {
  mbd.movieSimilar({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.get('/tv', (req, res) => {
  mbd.tvInfo({id: req.query.id}, (err, response) => {
    res.send(response);
  })
});

route.use('/', express.static(path.join(__dirname, '../public_static')));

exports.route = route;