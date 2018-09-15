const express = require('express');
const route = express.Router();
const fs = require('fs');
const handlebars = require('handlebars');
let body;

let sample = { posterLink: 'https://image.tmdb.org/t/p/w500//afdZAIcAQscziqVtsEoh2PwsYTW.jpg',
  title: 'Alpha',
  releaseDate: '2018',
  backgroundImage: 'https://image.tmdb.org/t/p/w500//nKMeTdm72LQ756Eq20uTjF1zDXu.jpg',
  para1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  heading1: 'Lorem Ipsum',
  image1: 'http://wegotthiscovered.com/wp-content/uploads/2018/07/avengers-4-iron-man-1.jpg' };

body = sample;
let ctr=1;
route.post('/', (req,res,next)=>{
  body = Object.assign({},body,req.body);
  if(ctr){
    ctr=0;
    res.send('done');
  } else {
    next();
  }

});

route.use((req,res)=>{
  let blog = handlebars.compile(fs.readFileSync('/home/shubham/MovieApp/views/BlogMovie.hbs').toString('utf-8'));
  let blogCss = fs.readFileSync('/home/shubham/MovieApp/views/css/main.css');
  blog = blog(body);
  fs.writeFileSync('/home/shubham/MovieApp/reviewSite/index.html',blog);
  fs.writeFileSync('/home/shubham/MovieApp/reviewSite/blog.css',blogCss);
  res.redirect('/github-oauth');
});

exports.route = route;
