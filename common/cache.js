var redis  = require('./redis');
var _      = require('lodash');
var logger = require('./logger');


var zrem = function (key,member,callback) {

  redis.zrem(key,member,function (err,data) {
    if (err){
      callback(err);
      return;
    }
    console.log('data =' + data);
    callback(err,data);
  });

};
exports.zrem=zrem;

var zcard = function (key,callback) {

    redis.zcard(key,function(err,data){
        if(err){
            callback(err);
        }
        console.log('data =' + data);
        callback(null,data);
    });
};
exports.zcard=zcard;

var zrevrange = function (key,start,end,callback) {

    redis.zrevrange(key,start,end,function(err,data){
        if(err){
            callback(err);
        }

        console.log('data =' + data);
        callback(null,data);
    });
};
exports.zrevrange=zrevrange;

var get = function (key, callback) {
  var t = new Date();
  redis.get(key, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (!data) {
      return callback();
    }
    data = JSON.parse(data);
    var duration = (new Date() - t);
    logger.debug('Cache', 'get', key, (duration + 'ms').green);
    callback(null, data);
  });
};

exports.get = get;

// time 参数可选，秒为单位
var set = function (key, value, time, callback) {
  var t = new Date();

  if (typeof time === 'function') {
    callback = time;
    time = null;
  }
  callback = callback || _.noop;
  value = JSON.stringify(value);

  if (!time) {
    redis.set(key, value, callback);
  } else {
    redis.setex(key, time, value, callback);
  }
  var duration = (new Date() - t);
  logger.debug("Cache", "set", key, (duration + 'ms').green);
};

exports.set = set;
