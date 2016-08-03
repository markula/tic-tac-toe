const express = require('express');
const app = express();
const http = require('http').Server(app);

const nunjucks = require('nunjucks');

nunjucks.configure({
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  let tmpData = {
    game: {
      rows: [
        {
          id: 1,
          cells: [
            { id: 1, val: 1 },
            { id: 2, val: 1 },
            { id: 3, val: 0 }
          ]
        },
        {
          id: 2,
          cells: [
            { id: 1, val: 2 },
            { id: 2, val: 0 },
            { id: 3, val: 0 }
          ]
        },
        {
          id: 3,
          cells: [
            { id: 1, val: 0 },
            { id: 2, val: 0 },
            { id: 3, val: 0 }
          ]
        }
      ]
    }
  };

  res.render('views/index.html', tmpData);
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
