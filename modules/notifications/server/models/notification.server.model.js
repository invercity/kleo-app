'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Page Schema
 */
var NotificationSchema = new Schema({
  title: String,
  details: String,
  created: {
    type: Date,
    default: Date.now
  },
  schedule: {
    type: Date,
    default: Date.now
  },
  users: {
    type: [Schema.ObjectId]
  }
});

mongoose.model('Notification', NotificationSchema);