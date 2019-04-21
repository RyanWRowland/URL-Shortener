'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  original: {
    type: String,
    required: true
  },
  short: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Url', urlSchema);