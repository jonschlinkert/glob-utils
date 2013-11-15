/**!
 * glob-utils
 * http://github.com/helpers/glob-utils
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var fs = require('fs');
var path = require('path');
var glob = require('globule');
var _ = require('lodash');


// The module to export.
exports = module.exports = {};


function readFile(src) {
  return fs.readFileSync(src, 'utf8');
}


/**
 * Globbing Utils
 */

var filepath = function (patterns, options) {
  options = _.extend({sep: ''}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return filepath.concat();
  });
};

var filename = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return path.basename(filepath).concat();
  });
};

var basename = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return path.basename(filepath, path.extname(filepath)).concat();
  });
};

var extname = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return path.extname(filepath).concat();
  });
};

var content = function (patterns, options) {
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    return readFile(filepath).concat();
  });
};

var all = function (patterns, options) {
  var globs = [];
  options = _.extend({sep: '', filter: 'isFile'}, options || {});
  return glob.find(patterns, options).map(function (filepath) {
    globs.push({
      content : readFile(filepath),
      filepath: filepath,
      filename: path.basename(filepath),
      basename: path.basename(filepath, path.extname(filepath)),
      extname: path.extname(filepath),
    });
    return globs;
  });
};


module.exports = {
  content: content,
  filepath: filepath,
  filename: filename,
  basename: basename,
  extname: extname,
  all: all
};