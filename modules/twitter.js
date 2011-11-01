var sys = require('sys'),
	EventEmitter = require('events').EventEmitter,
	redis = require("redis"),
	TwitterNode	= require('twitter-node').TwitterNode;

function extend(a, b) {
  Object.keys(b).forEach(function (key) {
    a[key] = b[key];
  });
  return a;
}

var twitterStream = exports.twitterStream = function(options) {
	var self           	= this;
	var default_config	= {action: "filter"};
	this.twitter     	= new TwitterNode(extend(default_config,options)); 
	this.redisClient 	= redis.createClient();
	this.tweetList 		= "yodel-tweet-list";
	this.prizeList 		= "yodel-prize-list";
	this.prizeLevels	= [10,20,50,100,1000,1500,1900,2000,2500,3000,4000,5000,6000];
	this.tweetCount		= 0;
	
	this.twitter.addListener('tweet', function(tweet){
		//Store tweet to redis as a JSON string
		var JSONtweet = JSON.stringify(tweet);
		self.redisClient.lpush(self.tweetList,JSONtweet,function(err,len){
			self.twitter.emit('tweetCount', len);
			if(self.prizeLevels.indexOf(len) > -1){
				self.awardPrize(tweet,len);
			}
		});
	});
	
	this.twitter.addListener('error', function(error){
		console.log(error.message); 
	});
	
	this.twitter.addListener('limit', function(limit){
		sys.puts('LIMIT: ' + sys.inspect(limit));
	});
	
	this.twitter.addListener('delete', function(del){
		sys.puts('DELETE: ' + sys.inspect(del));
	});
	
	this.twitter.addListener('end', function(resp){
		sys.puts('wave goodbye...' + resp.statusCode);
	});
	
	this.twitter.stream();
}

twitterStream.prototype = Object.create(EventEmitter.prototype);

twitterStream.prototype.awardPrize = function (tweet,index){
	var self = this;
	var JSONtweet = JSON.stringify(tweet);
	this.redisClient.lpush(this.prizeList,JSONtweet,function(err,len){
		self.twitter.emit('prizeCount', len);
	});
}

twitterStream.prototype.track = function (tracks){
	this.twitter.track(tracks);
	this.twitter.stream();
	return this;
}

twitterStream.prototype.addListener = function(e,cb){
	this.twitter.addListener(e,cb);
}