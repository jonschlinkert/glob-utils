/**!
 * glob-utils
 * http://github.com/helpers/glob-utils
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var path = require('path');
var grunt = require('grunt');
var fs   = require('graceful-fs');
var util = require('util');
var to   = require('to');
var _    = grunt.util._; // lodash

// Export the utils module.
exports = module.exports = {};


/**
 * Globbing Utils
 */

exports.content = function (patterns, sep) {
  sep = sep || '';
  return grunt.file.expand({filter: 'isFile'}, patterns).map(function (filepath) {
      return grunt.file.read(filepath) + sep;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};

exports.filepath = function (patterns, sep) {
  sep = sep || '';
  return grunt.file.expand(patterns).map(function (filepath) {
      return filepath + sep;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};

exports.filename = function (patterns, sep) {
  sep = sep || '';
  return grunt.file.expand(patterns).map(function (filepath) {
      return path.basename(filepath) + sep;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};

exports.basename = function (patterns, sep) {
  sep = sep || '';
  return grunt.file.expand(patterns).map(function (filepath) {
      return path.basename(filepath, path.extname(filepath)) + sep;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};


/**
 * Task Utils
 */


exports.mergeOptionsArrays = function(target, name) {
  var taskArray = grunt.config(['manifest', 'options', name]) || [];
  var targetArray = grunt.config(['manifest', target, 'options', name]) || [];
  return _.union([], taskArray, targetArray);
};


exports.detectDestType = function(dest) {
  if(_.endsWith(path.normalize(dest), path.sep)) {
    return 'directory';
  } else {
    return 'file';
  }
};


exports.extension = function(fileName) {
  grunt.verbose.writeln('extension');
  grunt.verbose.writeln(fileName);
  if(kindOf(fileName) === 'array' && fileName.length > 0) {
    fileName = fileName[0];
  }
  return _(fileName.match(/[^.]*$/)).last();
};


// Windows?
var win32 = process.platform === 'win32';
exports.pathNormalize = function(urlString) {
  if (win32) {
  return urlString.replace(/\\/g, '/');
  } else {
    return urlString;
  }
};

/**
 * Read optional JSON from Ben Alman,
 * https://gist.github.com/2876125
 */
exports.readOptionalJSON = function(filepath) {
  var data = {};
  try {
    data = grunt.file.readJSON(filepath);
  } catch (e) {}
  return data;
};
exports.readOptionalYAML = function(filepath) {
  var data = {};
  try {
    data = grunt.file.readYAML(filepath);
  } catch (e) {}
  return data;
};

exports.readJSONorYAML = function(ext) {
  var reader = grunt.file.readJSON;
  switch(ext) {
    case '.json':
      reader = grunt.file.readJSON;
      break;
    case '.yml':
    case '.yaml':
      reader = grunt.file.readYAML;
      break;
  }
  return reader;
};

exports.stringifyData = function(data, indent) {
  var YAML = require('to').format.yaml;
  if (ext === 'YAML' || ext === 'yaml' || ext === 'yml') {
    format = YAML.stringify(data, null, indent);
  } else {
    format = JSON.stringify(data, null, indent);
  }
  return format;
};

exports.sortObject = function(o) {
  var sorted = {},
  key, a = [];
  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }
  a.sort();
  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
};






exports.deepExtend = function(obj) {
  var deepMerge = function(target, source) {
    for (var key in source) {
      var original = target[key];
      var next = source[key];
      if (original && next && typeof next == "object") {
        deepMerge(original, next);
      } else {
        target[key] = next;
      }
    }
    return target;
  };

  _.each(Array.prototype.slice.call(arguments, 1), function(source) {
    deepMerge(obj, source);
  });

  return obj;
}
