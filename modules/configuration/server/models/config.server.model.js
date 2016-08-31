'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Config Schema
 */
var ConfigSchema = new Schema({
  domainId: {
    type: Schema.ObjectId
  },
  type: {
    type: String,
    enum: ['core', 'domain']
  },
  data: {
    type: Schema.Types.Mixed
  }
});

mongoose.model('Config', ConfigSchema);