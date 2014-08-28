/*!
 * glob-utils <https://github.com/assemble/glob-utils>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var should = require('should');
var glob = require('../');

describe('glob expand', function () {
  it('should return a glob of filepaths', function () {
    var actual = glob.expand('test/fixtures/*.md');
    actual.should.be.an.array;
    actual.should.eql(['test/fixtures/a.md', 'test/fixtures/b.md', 'test/fixtures/c.md']);
  });
});


describe('glob basename', function () {
  it('should return a glob of basenames', function () {
    var actual = glob.basename('test/fixtures/*.md');
    actual.should.be.an.array;
    actual.should.eql(['a.md', 'b.md', 'c.md']);
  });
});


describe('glob parse', function () {
  it('should parse a glob of files', function () {
    var actual = glob.parse('test/fixtures/*.md');
    actual.should.be.an.array;
    actual[0].should.have.property('data');
    actual[0].should.have.property('content');
  });
});

describe('glob file', function () {
  it('should return a glob of file objects.', function () {
    var actual = glob.file('test/fixtures/*.md');
    actual.should.be.an.array;
    var expected = [ { 'test/fixtures/a.md':
     { basename: 'a.md',
       content: '---\ntitle: AAA\n---\nThis is content.' } },
  { 'test/fixtures/b.md':
     { basename: 'b.md',
       content: '---\ntitle: BBB\n---\nThis is content.' } },
  { 'test/fixtures/c.md':
     { basename: 'c.md',
       content: '---\ntitle: CCC\n---\nThis is content.' } } ];
    actual.should.eql.expected;
  });
});
describe('glob read', function () {
  it('should read a glob of files', function () {
    var actual = glob.read('test/fixtures/*.md');
    actual.should.be.an.array;
    var expected = [ { 'test/fixtures/a.md': '---\ntitle: AAA\n---\nThis is content.' },
      { 'test/fixtures/b.md': '---\ntitle: BBB\n---\nThis is content.' },
      { 'test/fixtures/c.md': '---\ntitle: CCC\n---\nThis is content.' } ]
    actual.should.eql.expected;
  });
});