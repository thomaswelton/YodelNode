/*
 * GET home page.
 */

var redis = require("redis"),
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
		}
	},
	function(err, results) {
		res.render('index', {'title': "Swiss Yodel", 'tweetCount': results.tweetCount, 'prizeCount': results.prizeCount });
	});
};