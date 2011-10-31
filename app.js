/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer()
	, io = require('socket.io').listen(app);
	
io.set('log level', 1);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
	//Emit events for a new connection here
});

//Start twitter streaming

var twitterStream = require('./modules/twitter.js').twitterStream;
var twitter = new twitterStream({user: "user", password: "password"});

twitter.track('#HardestThingToDo');
twitter.addListener('tweet',function(tweet){
	io.sockets.emit('tweet',tweet);
});
twitter.addListener('tweetCount',function(int){
	io.sockets.emit('tweetCount',int);
});
twitter.addListener('prizeCount',function(count){
	io.sockets.emit('prizeCount',count);
});