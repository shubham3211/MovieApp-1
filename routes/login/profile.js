const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  if(!req.user){
    res.send(false);
  } else {
    res.send(req.user);
  }
});

exports.route = route;