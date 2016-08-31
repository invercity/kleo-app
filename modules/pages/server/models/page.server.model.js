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
  created: {
    type: Date,
    default: Date.now
  },
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
  templateId: {
    type: Schema.ObjectId
  },
  templateData: {
    type: Schema.Types.Mixed
  },
	domain: {
    type: Schema.ObjectId
  }
});

mongoose.model('Page', PageSchema);