const route =  require('express').Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('../../config/keys');
const User = require('../../models/user-model');

// route.get('/login', (req, res) => {
//   res.render('login', {user: req.user});
// });
//
// route.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  });
});


passport.use(
  new FacebookStrategy({
    callbackURL: 'https://moviedb-tv-app.herokuapp.com/facebook-oauth/facebook/redirect',
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret
  },(accessToken,refreshToken,profile,done) => {
    console.log(profile);
    User.findOne({facebookId: profile.id}).then((currentUser) => {
      if(currentUser){
        console.log(currentUser);
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          facebookId: profile.id,
          // thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          done(null, newUser);
        })
      }
    });
  })
);

route.get('/facebook', passport.authenticate('facebook'));

route.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/home');
});

exports.route = route;