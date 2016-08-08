const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const nunjucks = require('nunjucks');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const _ = require('lodash');

const Game = require('./server/Game');

//post request data stuff
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.enable('trust proxy')

nunjucks.configure({
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('views/index.html');
});

//GAME
//create
app.post('/game/create', (req, res) => {
  let game = new Game({ boardSize: +req.body.boardSize, pId: 1 });

  game
  .saveGame()
  .then(() => {
    res.redirect(`/game/${game.id}/${game.pId}`);  
  })
  .catch((err) => {
    res.redirect('views/404.html', {
      message: 'error creating game'
    });
  });
  
});

//view game
app.get('/game/:gameId/?:userId', (req, res) => {
  if(+req.params.userId === 1 || +req.params.userId === 2) { 
    let fileName = `/tmp/${req.params.gameId}.json`;  
    jsonfile.readFile(fileName, (err, obj) => {
      if(!err) {
        //add player id
        obj.pId = +req.params.userId;
        let data = { game: obj , playerId: req.params.userId };
        res.render('views/game.html', data);
      } else {
        res.render('views/404.html', {
          message: 'game not found'
        });
      }
    });
  } else {
    res.render('views/404.html', {
      message: 'game access denied'
    });
  }
});

//socket for broadcasting moves
io
.of('/game')
.on('connection', (socket) => {
  let game = {};

  socket.on('initGame', (gameData) => {
    let fileName = `/tmp/${gameData.id}.json`;  
    jsonfile.readFile(fileName, (err, obj) => {
      if(!err) {
        let gData = _.assignIn(gameData, obj);
        //create game for duration of socket
        game = new Game(gData);
      } else {
        //handle error?
      }
    });
  });

  socket.on('makeMove', (move) => {
    if(move.gId === game.id) {
      game
      .makeMove(move)
      .then(() => {
        socket.emit('moveSuccess', move);
        socket.broadcast.emit('gameMove', move);
      })
      .catch((err) => {
        socket.emit('moveError', err.move);
      })
    }
  });

  socket.on('gameMove', (move) => {
    game.addMove(move);
  });
});

//start server
server.listen(3000, () => {
  console.log('listening on port 3000');
});
