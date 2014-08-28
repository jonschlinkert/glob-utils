/*!
 * glob-utils <http://github.com/jonschlinkert/glob-utils
 *
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('globby');
var matter = require('gray-matter');

var utils = module.exports;


/**
 * Return a glob of file paths.
 *
 * @param  {String} `patterns` File paths or glob patterns to expand.
 * @param  {Object} `options` Options to pass to [globby]
 * @return {Array}
 * @api public
 */

utils.expand = function (patterns, options) {
  return glob.sync(patterns, options);
};


/**
 * Return a glob of basenames.
 *
 * @param  {String} `patterns` File paths or glob patterns to expand.
 * @param  {Object} `options` Options to pass to [globby]
 * @return {Array}
 * @api public
 */

utils.basename = function (patterns, options) {
  return glob.sync(patterns, options).map(function (filepath) {
    return path.basename(filepath);
  });
};


/**
 * Return a glob of files, with yaml front matter parsed.
 *
 * @param  {String} `patterns` File paths or glob patterns to expand.
 * @param  {Object} `options` Options to pass to [globby] and [gray-matter]
 * @return {Array}
 * @api public
 */

utils.parse = function (patterns, options) {
  return glob.sync(patterns, options).map(function(filepath) {
    var file = matter.read(filepath, options);
    file.path = filepath;
    return file;
  });
};


/**
 * Return a glob of files with content.
 *
 * @param  {String} `patterns` File paths or glob patterns to expand.
 * @param  {Object} `options` Options to pass to [globby]
 * @return {Array}
 * @api public
 */

utils.read = function (patterns, options) {
  return glob.sync(patterns, options).map(function(filepath) {
    var file = {};
    file[filepath] = fs.readFileSync(filepath, 'utf8');
    return file;
  });
};


/**
 * Return a glob of file objects, including:
 *
 *   - `basename`: the basename of the file path
 *   - `content`: the content, from `fs.readFileSync`
 *
 * @param  {String} `patterns` File paths or glob patterns to expand.
 * @param  {Object} `options` Options to pass to [globby]
 * @return {Array}
 * @api public
 */

utils.file = function (patterns, options) {
  return glob.sync(patterns, options).map(function(filepath) {
    var file = {}, o = {};
    file.basename = path.basename(filepath);
    file.content = fs.readFileSync(filepath, 'utf8');
    o[filepath] = file;
    return o;
  });
};
