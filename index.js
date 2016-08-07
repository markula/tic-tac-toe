const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const nunjucks = require('nunjucks');
const Game = require('./server/Game');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');

//post request data stuff
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

nunjucks.configure({
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  let game = new Game({ boardSize: 3 });
  game.saveGame();
  let tmpData = { game: game };

  res.render('views/index.html', tmpData);
});

//GAME
//create
app.post('/game/create', (req, res) => {
  let game = new Game({ boardSize: +req.body.boardSize });

  game
  .saveGame()
  .then(() => {
    res.redirect(`/game/${game.id}/1`);  
  })
  .catch((err) => {
    res.redirect('views/404.html', {
      message: 'error creating game'
    });
  });
  
});

//view game
app.get('/game/:gameId/:userId', (req, res) => {
  let fileName = `/tmp/${req.params.gameId}.json`;
  jsonfile.readFile(fileName, (err, obj) => {
    if(!err) {
      let data = { game: obj };
      res.render('views/game.html', data);
    } else {
      res.render('views/404.html', {
        message: 'game not found'
      });
    }
  });
});

//socket for broadcasting moves
io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('dodo', { youAre: 'turd sandwich' })

  socket.on('bob', (data) => {
    console.log(data);
    socket.broadcast.emit('dodo', data);
  });
});

//start server
server.listen(3000, () => {
  console.log('listening on port 3000');
});
