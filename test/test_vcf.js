/*
 * biojs-vcf
 * https://github.com/shyamrallapalli/biojs-vcf
 *
 * Copyright (c) 2015 Shyam Rallapalli
 * Licensed under the MIT license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var vcf = require('../');

describe('biojs-vcf module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(vcf.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      vcf.hello('biojs').should.equal("hello biojs");
    });
  });
});
