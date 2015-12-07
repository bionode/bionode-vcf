/*
 * biojs-vcf
 * https://github.com/shyamrallapalli/biojs-vcf
 *
 * Copyright (c) 2015 Shyam Rallapalli and Martin Page
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
    var rl = readline.createInterface(instream, outstream);

    var numSamples = 0;
    var sampleObject = {};
    var sampleIndex = {};
    var vcfAttrib = {};


    rl.on('line', function(line) {

        //set number of samples in vcf file

        // check if line starts with hash and use them
        if (line.indexOf('#') == 0) {

            //##fileformat=VCFv4.1
            if (!vcfAttrib.vcf_v) {
                vcfAttrib.vcf_v = line.match(/^##fileformat=/) ?  line.split('=')[1] : null ;
            }

            //##samtoolsVersion=0.1.19-44428cd
            if (!vcfAttrib.samtools) {
                vcfAttrib.samtools = line.match(/^##samtoolsVersion=/) ? line.split('=')[1] : null ;
            }

            //##reference=file://../index/Chalara_fraxinea_TGAC_s1v1_scaffolds.fa
            if (!vcfAttrib.refseq) {
                vcfAttrib.refseq = line.match((/^##reference=file:/)) ? line.split('=')[1] : null ;
                // console.log(vcfAttrib.refseq)
            }

            //#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	sample1	sample2	sample3
            if (line.match(/^#CHROM/)) {
                var sampleinfo = line.split('\t');
                numSamples = sampleinfo.length - 9;

                for (var i = 0; i < numSamples; i++) {
                    sampleIndex[i] = sampleinfo[9 + i];
                }

            }


        }
        // go through remaining lines
        else {
            // split line by tab character
            var info = line.split('\t');

            if (info.length < 9) {
                var err = new Error('number of columns in the file are less than expected in vcf');
                vcf.emit('error', err);
            }

            // format information ids
            var formatIds = info[8].split(':');

            // parse the sample information
            for (var j = 0; j < numSamples; j++) {
                sampleObject[sampleIndex[j]] = {};
                var formatParts = info[9].split(':');
                for (var k = 0; k < formatParts.length; k++) {
                    sampleObject[sampleIndex[j]][formatIds[k]] = formatParts[k];
                }
            }

            // parse the variant call information
            var varInfo = info[7].split(';');
            var infoObject = {};

            // check if the variant is INDEL or SNP
            var type;
            if (varInfo[0].match(/^INDEL$/)) {
                type = 'INDEL';
                varInfo.shift();
            }
            else {
                type = 'SNP';
            }
            infoObject['VAR'] = type;

            // variant info added to object
            for (var l = 0; l < varInfo.length; l++) {
                var pair = varInfo[l].split("=");
                infoObject[pair[0]] = pair[1];
            }

            // parse the variant information
            var feature = {
                chr: info[0],
                pos: info[1],
                id: info[2],
                ref: info[3],
                alt: info[4],
                qual: info[5],
                filter: info[6],
                varinfo: infoObject,
                sampleinfo: sampleObject,
                attributes: vcfAttrib
            };

            // console.log('Features',features);
            vcf.emit('data', feature);

        }

    });

    rl.on('close', function () {
        vcf.emit('end');
    });

    return this;

};

module.exports = vcf;
