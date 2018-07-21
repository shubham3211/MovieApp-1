const express = require('express');
const path = require('path');

const app = express();

const routes = {
  home: require('./routes/home').route
};

app.use('/', routes.home);

app.listen(3000, () => console.log('http://localhost:3000'));