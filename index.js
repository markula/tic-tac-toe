const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure({
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('views/index.html', {name: 'bob'});
});

//game moves
// create
// game page
// make move

//models
// game model
// row model

//config
// board squares

//views
// index.html
// game.html
// board.html
// row.html
// cell.html


app.listen(3000, function () {
  console.log('listening on port 3000');
});
