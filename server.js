const express = require('express');
const path = require('path');
// let sassMiddleware = require('node-sass-middleware');

const app = express();

const routes = {
  home: require('./routes/home').route,
  movie: require('./routes/movies').route,
  tv: require('./routes/tv').route,
  info: require('./routes/info').route,
};

// app.use(sassMiddleware({
//   src: __dirname + '/public_static/css',
//   dest: __dirname + '/public_static/css',
//   debug: true,
//   outputStyle: 'compressed',
//   prefix:  '/prefix'
// }));

app.use('/', routes.home);

app.use('/movie', routes.movie);

app.use('/tv', routes.tv);

app.use('/info', routes.info);

app.listen(3000, () => console.log('http://localhost:3000'));