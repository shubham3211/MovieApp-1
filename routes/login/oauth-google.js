const route =  require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
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
  new GoogleStrategy({
    callbackURL: '/google-oauth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },(accessToken,refreshToken,profile,done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          done(null, newUser);
        })
      }
    });


  })
);

route.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

route.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/home');
});

exports.route = route;