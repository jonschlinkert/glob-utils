# glob-utils [![NPM version](https://badge.fury.io/js/glob-utils.png)](http://badge.fury.io/js/glob-utils)

> Utilities for file globbing and Grunt.js projects.

## Quickstart

```bash
npm i glob-utils --save
```

## Methods

```js
var glob = require('glob-utils');

// Returns an array of filepaths
glob.filepath(patterns, options)
// Returns an array of file names
glob.filename(patterns, options)
// Returns an array of basenames
glob.basename(patterns, options)
// Returns an array of file extensions
glob.extname(patterns, options)
// Returns an array, each item is the content of a file
glob.content(patterns, options)
// Returns an array of objects. each object contains the above properties
glob.all(patterns, options)
```

## Examples

### glob.extname()

Return an array of extensions for files that match the given pattern.

```js
var _ = require('lodash');
var extnames = _.unique(glob.extname('foo/*.*'));
console.log(extnames);
```
might return something like:

```json
[
  ".md",
  ".js",
  ".json"
]
```
### glob.filepath()

Return an array of filepaths for files that match the given pattern.

```js
var filepaths = glob.filepath('foo/*.md');
console.log(filepaths);
```

might return something like:

```json
[
  "path/to/foo.md",
  "path/to/bar.md"
]
```

### glob.content()
Return an array of content for files that match the given pattern.

```js
glob.content('foo/*.md').join('\n');
```

might return something like:

```
This is the content from foo.

This is the content from Bar.
```

### glob.all()
Return an array of objects, where each object contains the following properties:

* `filepath`
* `filename`
* `basename`
* `content`

```js
glob.all('foo/*.md');
```
might return something like:

```json
[
  {
    "content": "This is the content from foo.",
    "filepath": "path/to/foo.md",
    "filename": "foo.md",
    "basename": "foo",
    "extname": ".md"
  },
  {
    "content": "This is the content from bar.",
    "filepath": "path/to/bar.md",
    "filename": "bar.md",
    "basename": "bar",
    "extname": ".md"
  }
]
```

### Example usage
Example usage in an Underscore or Lo-Dash mixin:

```js
var glob = require('glob-utils');

grunt.util._.mixin({
  include: function (filepath, options) {
    return glob.content(filepath, options);
  }
});
```

Now use the mixin we just created:

```js
_.include("docs/*.md");
```
Or in templates:

```js
<%= _.include("docs/*.md") %>
```

Returns the concatenated content of all files in the `docs/` directory with the `.md` extension.

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](http://github/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert
Licensed under the [MIT license](./LICENSE-MIT).