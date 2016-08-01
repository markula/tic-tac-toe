const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure({
  autoescape: true,
  express: app
});

app.get('/', function(req, res) {
  res.render('views/index.html');
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
