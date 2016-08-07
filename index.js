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
  console.log(game);

  let tmpData = { game: game };

  res.render('views/index.html', tmpData);
});

//GAME
//create
app.post('/game/create', (req, res) => {
  let game = new Game(req.body);
  let fileName = `/games/${game.id}.json`;

  jsonfile.writeFile(fileName, game, function() {
    console.log(`wrote game: ${fileName}`);
  });

  console.log(game);
  // res.redirect('/game/'+game.id+'/'+game.player1Id);
});

//view game
app.get('/game/:gameId/:userId', (req, res) => {

});

server.listen(3000, () => {
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
