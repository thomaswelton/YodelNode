/*
 * GET home page.
 */

var redis = require("redis"),
	url = require('url'),
	redisClient = redis.createClient(),
	EventEmitter = require('events').EventEmitter,
	async = require('async');

exports.index = function(req, res){
	//View for the index.js file
	async.parallel({
		tweetCount: function(callback){
			redisClient.llen("yodel-tweet-list",function(err, len) {
				callback(null, len);
			});
		},
		prizeCount: function(callback){
			redisClient.llen("yodel-prize-list",function(err, len) {
				callback(null, len);
			});
		},
		development: function(callback){
			var query = url.parse(req.url,true).query;
			callback(null, (typeof(query.dev)!== 'undefined' && query.dev == 1));
		}
	},
	function(err, results) {
		res.render('index', {'title': "Swiss Yodel", 'tweetCount': results.tweetCount, 'prizeCount': results.prizeCount,'development': results.development });
	});
};