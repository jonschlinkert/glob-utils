/**!
 * glob-utils
 * http://github.com/helpers/glob-utils
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var fs = require('fs');
var path = require('path');

// node_modules
var glob = require('globule');
var _ = require('lodash');


/**
 * Globbing Utils
 */

exports.filepath = function (patterns, options) {
  options = _.extend({sep: ''}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return filepath;
  });
};

exports.filename = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return path.basename(filepath);
  });
};

exports.basename = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return path.basename(filepath, path.extname(filepath));
  });
};

exports.extname = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return _.unique(glob.find(patterns, options).map(function (filepath) {
    return path.extname(filepath);
  }));
};

exports.content = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    filepath = fs.readFileSync(filepath, 'utf8');
    return filepath;
  });
};

exports.fileObj = function (patterns, options) {
  var globObj = [];
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    globObj.push({
      content : fs.readFileSync(filepath, 'utf8'),
      filepath: filepath,
      filename: path.basename(filepath),
      basename: path.basename(filepath, path.extname(filepath)),
      extname: path.extname(filepath),
    });
    return globObj;
  });
};

// Alias for backward compatibility. Note that
// this will not be available as a Lo-Dash mixin
exports.any = exports.fileObj;


// Mix exports into lodash
_.mixin(exports);