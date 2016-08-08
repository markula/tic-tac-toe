# tic tac toe

a grunt based project that runs an express server and socket.io to handle game communication and logic server side. i spent a couple hours most nights of the past week building this out, including dev/build tooling. took a little bit to get it so everything would update and rebuild as i wanted them to. 

to build and run project, first run `npm install`. next run `grunt`. navigate to `http://localhost:3000/` and create a game! 

if you run into errors where grunt isn't found, run `npm install -g grunt-cli` to install the command line interface globally.

i'm using json files wrote to /tmp to mock a document db and chose the front end i did because it's the languages/libraries i'm most familiar with and feel i can produce the best code with.