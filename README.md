# bionode-vcf

[![NPM version](http://img.shields.io/npm/v/bionode-vcf.svg)](https://www.npmjs.org/package/bionode-vcf)
[![Build Status](https://secure.travis-ci.org/shyamrallapalli/bionode-vcf.png?branch=master)](http://travis-ci.org/shyamrallapalli/bionode-vcf)

> a vcf parser in javascript

## Getting Started
Install the module with: `npm install bionode-vcf`

```javascript
var vcf = require('bionode-vcf');
vcf.read("/path/sample.vcf");
vcf.on('data', function(feature){
    console.log(feature);
})

vcf.on('end', function(){
    console.log('end of file')
})

vcf.on('error', function(err){
    console.error('it\'s not a vcf', err)
})

```

## Documentation
VCF format specifications and more information about the fileds can be found at
[1000 genomes webpage](http://www.1000genomes.org/wiki/analysis/variant%20call%20format/vcf-variant-call-format-version-41) and
[samtools github page](https://github.com/samtools/hts-specs)

## Contributing

All contributions are welcome.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/shyamrallapalli/bionode-vcf/issues).

## License 

The MIT License

Copyright (c) 2015, Shyam Rallapalli and Martin Page

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
