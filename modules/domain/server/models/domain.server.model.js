'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Domain Schema
 */
var DomainSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  domain: {
    type: String
  }
});

mongoose.model('Domain', DomainSchema);