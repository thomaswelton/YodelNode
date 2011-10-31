
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer()
	, io = require('socket.io').listen(app);

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


// twitter-node does not modify GLOBAL, that's so rude
var TwitterNode = require('twitter-node').TwitterNode
  , sys         = require('sys')

// you can pass args to create() or set them on the TwitterNode instance
var twit = new TwitterNode({
  user: 'thomaswelton', 
  password: 'j00m1aM0nk3y',
  port: 3000
});

// Make sure you listen for errors, otherwise
// they are thrown
twit.addListener('error', function(error) {
  console.log(error.message);
});

twit.addListener('tweet', function(tweet) {
	console.log(tweet);
	sys.puts("@" + tweet.user.screen_name + ": " + tweet.text);
  });

// We can also add things to track on-the-fly
twit.track('#HardestThingToDo');
twit.track('#SundayRoast');

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { html: '<p>world</p>' });
});

// This will reset the stream
twit.stream();
