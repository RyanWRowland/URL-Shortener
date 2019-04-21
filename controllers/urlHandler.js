'use strict';

var mongoose = require('mongoose');
var dns = require('dns');
var Url = require('../models/url.js');
var createNewUrl = require('./createNewUrl.js');

function handleNewUrl(req, res) {
  var url = req.body.url;
  
  // validate url
  var protocol = url.match(/(https?:\/\/)/);
  if (protocol) {
    var hostname = url.slice(protocol[0].length).split('/')[0];

    dns.lookup(hostname, function(err, address){
      if (err) return res.json({ error: "invalid URL" });
      // url is valid, check if exists in database already, otherwise create and add it
      Url.findOne({original: url}, function(err, data) {
        if (err) return console.log(err);
        if (data) {
          res.json({
            original_url: data.original,
            short_url: data.short
          });
        }
        else {
          createNewUrl(res, url);
        }
      });
    });
  }
  else {
    res.json({ error: 'invalid URL' })
  }
}

function handleShortUrl(req, res) {
  var short = req.params.short; 
  
  if (/^\d+$/.test(short)) {
    Url.findOne({short: short}, function (err, data) {
      if (err) return console.log(err);
      if (data) {
        res.redirect(data.original);
      }
      else {
        res.json({error: 'short url not found'});
      }
    })
  }
  else {
    res.json({error: 'invalid short url'});
  }
}

exports.newUrl = handleNewUrl;
exports.shortUrl = handleShortUrl;