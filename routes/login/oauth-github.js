let route = require('express').Router();
let passport = require('passport');
let githubStrategy = require('passport-github');
let key = require('../../config/keys');
const User = require('../../models/user-model');
const deploy = require('../../deploy');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  console.log('i am back');
  User.findById(id).then((user) => {
    done(null, user)
  });
});

passport.use(
  new githubStrategy({
    callback: 'http://localhost:3000/github/redirect',
    clientID: key.github.clientID,
    clientSecret: key.github.clientSecret
  },(accessToken,refreshToken,profile,done)=>{
    User.findOne({username: profile.username}).then((currentUser)=>{
      if(currentUser){
        currentUser.accessToken=accessToken;
        currentUser.save();
        console.log(currentUser);
        done(null,currentUser);
      }else{
        new User({
          username: profile.username,
          accessToken: accessToken
        }).save().then((newUser) => {
          console.log(newUser);
          done(null, newUser);
        })
      }
    })
  })
);

route.get('/github',passport.authenticate('github',{
  scope: ['public_repo', 'delete_repo', 'read:org']
}));

route.get('/github/redirect',passport.authenticate('github'),(req,res)=>{
  deploy(req.user.accessToken,req.user.username);
  res.redirect('/home');
});

exports.route = route;