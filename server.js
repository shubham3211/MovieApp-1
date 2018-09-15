const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser')

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

const routes = {
  home: require('./routes/home').route,
  movie: require('./routes/movies').route,
  tv: require('./routes/tv').route,
  info: require('./routes/info').route,
  google: require('./routes/login/oauth-google').route,
  facebook: require('./routes/login/oauth-facebook').route,
  github: require('./routes/login/oauth-github').route,
  profile: require('./routes/login/profile').route,
  updateUser: require('./routes/login/upadteUser').route,
  blog: require('./routes/blog').route
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes.home);

app.use('/login', (req, res) => {
  res.render('login');
});

app.use('/blog', routes.blog);

app.use('/profile', routes.profile);

app.use('/facebook-oauth', routes.facebook);

app.use('/google-oauth', routes.google);

app.use('/github-oauth', routes.github);

app.use('/movie', routes.movie);

app.use('/tv', routes.tv);

app.use('/info', routes.info);

app.use('/updateUser', routes.updateUser)

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));