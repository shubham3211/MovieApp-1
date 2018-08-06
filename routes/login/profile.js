const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  if(!req.user){
    res.send('not verified');
  } else {
    res.send('verified');
  }
});

exports.route = route;