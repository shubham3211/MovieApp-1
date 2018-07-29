const express = require('express');
const mbd = require('moviedb')('785128e1bd19a03ab1bee95dd3dc52dd');
const path = require('path');
const route = express.Router();

route.get('/popular', (req, res) => {
  mbd.miscPopularMovies({query: 'popular'}, (err, response) => {
    res.send(response);
  })
});

route.get('/top_rated', (req, res) => {
  mbd.miscTopRatedMovies({query: 'top_rated'}, (err, response) => {
    res.send(response);
  })
});

route.get('/now_playing', (req, res) => {
  mbd.miscNowPlayingMovies({query: 'now_playing'}, (err, response) => {
    res.send(response);
  })
});

route.get('/upcoming', (req, res) => {
  mbd.miscUpcomingMovies({query: 'upcoming'}, (err, response) => {
    res.send(response);
  })
});

route.use('/', express.static(path.join(__dirname, '../public_static')));
exports.route = route;