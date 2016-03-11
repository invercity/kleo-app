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
    domain: {
      type: String,
      default: ''
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