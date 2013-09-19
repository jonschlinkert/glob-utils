# globber [![NPM version](https://badge.fury.io/js/globber.png)](http://badge.fury.io/js/globber)

> "Mid-level" globbing utilities


## Quickstart

```bash
npm i globber --save
```

## Methods

```js
var glob = require('globber');

glob.content(patterns, sep) {
glob.filepath(patterns, sep) {
glob.filename(patterns, sep) {
glob.basename(patterns, sep) {
```

## Usage


Example usage in an Underscore or Lo-Dash mixin:

```js
var glob = require('globber');

grunt.util._.mixin({
  include: function (filepath) {
    return glob.content(filepath);
  }
});
```

Use the mixin:

```js
_.include("docs/*.md");
```


Or in templates:

```js
<%= _.include("docs/*.md") %>
```

Returns the concatenated content of all files in the `docs/` directory with the `.md` extension.



## Author

+ [github/jonschlinkert](http://github/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert
Licensed under the [MIT license](LICENSE-MIT).

***

Project created by [Jon Schlinkert](https://github.com/jonschlinkert).

_This file was generated on Wed Sep 18 2013 00:03:54._
