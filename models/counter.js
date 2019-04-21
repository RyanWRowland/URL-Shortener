'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  count: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Counter', counterSchema);