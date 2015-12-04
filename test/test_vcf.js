/*
 * biojs-vcf
 * https://github.com/shyamrallapalli/biojs-vcf
 *
 * Copyright (c) 2015 Shyam Rallapalli
 * Licensed under the MIT license.
 */

// chai is an assertion library
//var chai = require('chai');

// @see http://chaijs.com/api/assert/
//var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
//chai.expect();
//chai.should();

// requires your main app (specified in index.js)
var VCF = require('../lib/index');
var path = require('path');
var assert = require('assert');
var filePath = path.join(__dirname, 'sample.vcf');

var allFeatures = [];

describe('VCF', function(){
  describe('.read', function(){
    it('should read without error', function(done){

        function onFeature(vcf) {
            allFeatures.push(vcf);
        }

        VCF.read(filePath).on('data', onFeature).on('end', done);

    });
    it('should look like a valid output', function () {
        assert.notStrictEqual(allFeatures, validOutput);
    })
  });
});


var validOutput = [{
    chr: 'Cf746836_TGAC_s1v1_scaffold_4',
    pos: '5607',
    id: '.',
    ref: 'G',
    alt: 'C',
    qual: '18.1',
    filter: '.',
    varinfo: {
        DP: '6',
        VDB: '6.560000e-02',
        RPB: '1.427508e+00',
        AF1:' 0.5',
        AC1: '1',
        DP4: '3,1,1,1',
        MQ: '60',
        FQ: '21',
        PV4: '1,0.0023,1,1'
    },
    sampleinfo: {
        'foxley_wood1_bwa-mem-sorted.bam': {
            GT: '0/1',
            PL: '48,0,123',
            GQ: '51'
        }
    },
    attributes: {
        vcfver: '##fileformat=VCFv4.1',
        samtools: '##samtoolsVersion=0.1.19-44428cd',
        reference: '##reference=file://../index/Chalara_fraxinea_TGAC_s1v1_scaffolds.fa'

    }

}
];
