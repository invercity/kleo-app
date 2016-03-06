'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  dictionary = require('../../../dictionary/server/controllers/dictionary.server.controller'),
  contentTypes = dictionary.getJSONById('CONTENT_TYPE');

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
    type: String
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
  },
  category: {
    type: String,
    enum: contentTypes,
    required: 'You must specify category for content'
  }
});

ContentSchema.pre('save', function(next) {
  this.location = '/api/content/' + this.fileId;
  next();
});

mongoose.model('Content', ContentSchema);