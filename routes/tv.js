const express = require('express');
const mbd = require('moviedb')('785128e1bd19a03ab1bee95dd3dc52dd');
const path = require('path');
const route = express.Router();

route.get('/popular', (req, res) => {
  mbd.miscPopularTvs({query: 'popular'}, (err, response) => {
    res.send(response);
  })
});

route.get('/top_rated', (req, res) => {
  mbd.miscTopRatedTvs({query: 'top_rated'}, (err, response) => {
    res.send(response);
  })
});

route.get('/now_playing', (req, res) => {
  mbd.tvOnTheAir({query: 'on_the_air'}, (err, response) => {
    res.send(response);
  })
});

route.get('/upcoming', (req, res) => {
  mbd.tvAiringToday({query: 'airing_today'}, (err, response) => {
    res.send(response);
  })
});

route.use('/', express.static(path.join(__dirname, '../public_static')));
exports.route = route;