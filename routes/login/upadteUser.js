const express = require('express');
const route = express.Router();
let user = require('../../models/user-model')

route.post('/', (req,res) => {
  user.findById(req.body.id).then((result) => {
    let found = false;
    result["movie"].forEach((element) => {
      if(element.movieId == req.body.movieId){
        found=true;
        element.rating = req.body.rating;
      }
    });

    if(!found){
      result["movie"].push({movieId: req.body.movieId, rating: req.body.rating});
    }
    console.log(result);
    result.save();
  })
});

route.post('/addMovie', (req,res) => {
  user.findById(req.body.id).then((result)  => {
    let found = false;
    result["watchList"].forEach((element, index) => {
      if(element == req.body.name){
        found=true;
        result["watchList"].splice(index, 1);
        element = req.body.name;
      }
    });
    if(!found){
      result["watchList"].push(req.body.name);
    }
    console.log(result);
    result.save();
  })
})
exports.route = route;