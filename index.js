const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const nunjucks = require('nunjucks');

nunjucks.configure({
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  let tmpData = {
    game: {
      id: '101',
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

server.listen(3000, function () {
  console.log('listening on port 8080');
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('dodo', { youAre: 'turd sandwich' })

  socket.on('bob', (data) => {
    console.log(data);
    socket.broadcast.emit('dodo', data);
  });
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
