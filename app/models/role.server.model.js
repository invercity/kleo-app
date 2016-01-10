'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Page Schema
 */
var RoleSchema = new Schema({
  name: String,
  displayName: String,
  permissions: Schema.Types.Mixed
});

mongoose.model('Role', RoleSchema);