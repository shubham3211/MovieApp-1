const express = require('express');
const app = express();


const routes = {
  home: require('./routes/home').route,
  movie: require('./routes/movies').route,
  tv: require('./routes/tv').route,
  info: require('./routes/info').route,
  google: require('./routes/login/oauth-google').route,
  facebook: require('./routes/login/oauth-facebook').route,
};

app.use('/', routes.home);

app.use('/movie', routes.movie);

app.use('/tv', routes.tv);

app.use('/info', routes.info);

app.listen(3000, () => console.log('http://localhost:3000'));