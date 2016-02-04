'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  dictionary = require('../../../dictionary/server/controllers/dictionary.server.controller'),
  postTypes = dictionary.getJSONById('POST_TYPE');

/**
 * Post Schema
 */
var PostSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  options: {
    type: Schema.Types.Mixed,
    default: {
      displayAuthor: true,
      showMain: false,
      showGlobal: false
    }
  },
  // deprecated
  // will be removed in future API releases
  authorDisplay: {
    type: Boolean,
    default: true
  },
  postType: {
    type: String,
    enum: postTypes,
    default: postTypes[0]
  },
  visits: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  preview: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  domain: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Post', PostSchema);
