'use strict';

var dictionaries = {
  "POST_TYPE": {
    values: [
      "News",
      "Article",
      "Announcement"
    ]
  },
  "CONTENT_TYPE": {
    values: [
      "Avatar",
      "Post",
      "Document"
    ]
  }
};

exports.list = function(req, res) {
  res.json(dictionaries);
};

exports.getById = function(req, res, next, id) {
  if (dictionaries[id]) res.json(dictionaries[id]);
  else next(new Error("Failed to load dictionary: " + id));
};

exports.getJSONById = function(id) {
  return dictionaries[id] || {values: []};
};