const express = require('express');
const route = express.Router();
const fs = require('fs');
const handlebars = require('handlebars');
let body;

route.post('/', (req,res,next)=>{
  body = Object.assign({},body,req.body);
  res.send('done');
});

route.post('/form',(req,res,next)=>{
  body = Object.assign({},body,req.body);
  next();
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
