const express = require('express');
const route = express.Router();
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
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
  let blog = handlebars.compile(fs.readFileSync(path.resolve(__dirname,'../views/BlogMovie.hbs')).toString('utf-8'));
  let blogCss = fs.readFileSync(path.resolve(__dirname,'../views/css/main.css'));
  blog = blog(body);
  fs.writeFileSync(path.resolve(__dirname,'../reviewSite/index.html'),blog);
  fs.writeFileSync(path.resolve(__dirname,'../reviewSite/blog.css'),blogCss);
  res.redirect('/github-oauth');
});

exports.route = route;
