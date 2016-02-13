'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Content Schema
 */
var ContentSchema = new Schema({
  name: {
    type: String
  },
  mimeType: {
    type: String
  },
  fileId: {
    type: Schema.ObjectId
  },
  location: {
    type: String,
    default: '/content/' + this.fileId
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tags: {
    type: ['String']
  },
  size: {
    type: Number
  }
});

mongoose.model('Content', ContentSchema);