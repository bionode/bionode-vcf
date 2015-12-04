/*
 * biojs-vcf
 * https://github.com/shyamrallapalli/biojs-vcf
 *
 * Copyright (c) 2015 Shyam Rallapalli
 * Licensed under the MIT license.
 */


var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var events = require('events');

var vcf = new events.EventEmitter();

vcf.read = function (path) {

    var instream = fs.createReadStream(path);
    var outstream = new stream();
    var read = readline.createInterface(instream, outstream);

    read.on('line', function(line) {

        //set number of samples in vcf file
        var num_samples = 0;
        var sample_index = {};

        // check if line starts with hash and use them
        if (line.indexOf('#') == 0) {

            //##fileformat=VCFv4.1
            var vcf_v = line.match((/##fileformat=(.*)$/g));

            //##samtoolsVersion=0.1.19-44428cd
            var samtools = line.match((/##samtoolsVersion=(.*)$/g));

            //##reference=file://../index/Chalara_fraxinea_TGAC_s1v1_scaffolds.fa
            var refseq = line.match((/##reference=file:(.*)$/g));

            //#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	sample1	sample2	sample3
            if (line.test(/^#CHROM/)) {
                var sampleinfo = line.split('\t');
                num_samples = sampleinfo.length - 9;

                for (var i = 0; i < num_samples; i++) {
                    sample_index[i] = sampleinfo[10 + i];
                }

            }

            var attrib = {
                vcfver: vcf_v[0],
                samtools: samtools[0],
                reference: refseq[0]
            };
        }
        // go through remaining lines
        else {
            // split line by tab character
            var info = line.split('\t');

            var sampleObject = {};

            for (var j = 0; j < num_samples; j++) {

            }
            var arrayObject = {};
            var attParts = parts[8].split(';');
            for (var i = 0; i < attParts.length; ++i) {
                var pair = attParts[i].split("=");
                arrayObject[pair[0]] = pair[1];
            }


        }
    });
};

module.exports = vcf;
