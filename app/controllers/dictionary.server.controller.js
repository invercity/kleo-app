'use strict';

var dictionaries = {
  "POST_TYPE": [
    "news",
    "article",
    "announcement"
  ]
};

exports.list = function(req, res, next) {
  res.json(dictionaries);
};

exports.getById = function(req, res, next, id) {
  if (dictionaries[id]) res.json(dictionaries[id]);
  else next(new Error("Failed to load dictionary: " + id));
};