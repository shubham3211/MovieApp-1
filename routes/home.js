const express = require('express');
const mdb = require('moviedb')('785128e1bd19a03ab1bee95dd3dc52dd');
const axios = require('axios');
const path = require('path');
const route = express.Router();

route.get('/movies' , (req, res) => {

  mdb.miscNowPlayingMovies({query: 'now_playing'}, (err, response) => {
    res.send(response);
  })

});

route.get('/tv' , (req, res) => {

  mdb.tvOnTheAir({query: 'on_the_air'}, (err, response) => {
    res.send(response);
  })

});

route.use('/', express.static(path.join(__dirname, '../public_static/home')));
exports.route = route;