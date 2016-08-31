'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Page Schema
 */
var PageSchema = new Schema({
	title: {
		type: String,
    trim: true,
    required: 'Title cannot be blank'
	},
	type: {
	  type: String
  },
	url: {
    type: String
  },
	content: {
    type: String,
    default: '',
    trim: true
  },
	domain: {
    type: Schema.ObjectId
  }
});

mongoose.model('Page', PageSchema);