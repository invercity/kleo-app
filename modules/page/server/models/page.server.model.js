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
	title: String,
	menu: Schema.Types.Mixed,
	logo: String,
	// may be replaced with custom Type
	type: String,
	url: String,
	data: Schema.Types.Mixed,
	content: String,
	subdomain: Boolean
});

mongoose.model('Page', PageSchema);