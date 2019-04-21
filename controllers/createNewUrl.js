'use strict';

var mongoose = require('mongoose');
var Counter = require('../models/counter.js');
var Url = require('../models/url.js');

function createAndIncCounter(res, orig_url) {
  Counter.findOneAndUpdate({}, {$inc: {count: 1}}, {new: true}, function(err, data){
    if (err) return console.log(err);
    if (data) {
      create(res, orig_url, data.count);
    }
    else {
      var newCounter = new Counter();
      newCounter.save(function(err, data){
        if (err) return console.log(err);
        create(res, orig_url, data.count);
      });
    }
  });
}

function create(res, orig_url, short_url) {
  var newUrl = new Url({
    original: orig_url,
    short: short_url
  });
  
  newUrl.save(function(err, data) {
    if (err) return console.log(err);
    res.json({
      original_url: data.original,
      short_url: data.short
    });
  });
}

module.exports = createAndIncCounter;