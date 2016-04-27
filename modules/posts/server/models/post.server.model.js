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
  showMain: {
    type: Boolean,
    default: false
  },
  showGlobal: {
    type: Boolean,
    default: false
  },
  postType: {
    type: String,
    enum: postTypes
  },
  visits: {
    type: Number,
    default: 0
  },
  tags: {
    type:{name:String,value:String},
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
  },
  previewImg: {
    type: String
  },
  draft: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Post', PostSchema);
