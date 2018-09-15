const express = require('express');
const route = express.Router();
const fs = require('fs');
const handlebars = require('handlebars');
let body;

route.post('/', (req,res,next)=>{
  body = Object.assign({},body,req.body);
  console.log(body)
  res.send('done');
});

route.post('/form',(req,res,next)=>{
  body = Object.assign({},body,req.body);
  next();
});

route.use((req,res)=>{
  let blog = handlebars.compile(fs.readFileSync('../views/BlogMovie.hbs').toString('utf-8'));
  let blogCss = fs.readFileSync('../views/css/main.css');
  blog = blog(body);
  fs.writeFileSync('../reviewSite/index.html',blog);
  fs.writeFileSync('../reviewSite/blog.css',blogCss);
  res.redirect('/github-oauth');
});

exports.route = route;
