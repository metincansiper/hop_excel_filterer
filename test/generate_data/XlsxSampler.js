const _ = require('lodash');
const XlsxHandler = require('../../src/XlsxHandler');
const { shouldIncludeRow } = require('../../src/filter');
const { inplaceShuffle } = require('../../src/util');

class XlsxSampler extends XlsxHandler {
    constructor(inputPath) {
        super(inputPath);
    }

    getData(inputPath) {
        console.log('here');
        let {header, rows, sheetName} = super.getData(inputPath);
        const choosenIncludedRows = _.filter( rows, shouldIncludeRow ).slice(0,5);
        const choosenExcludedRows = _.filter( rows, row => !shouldIncludeRow(row) ).slice(0,20);
        const choosenRows = [...choosenIncludedRows, ...choosenExcludedRows];
        inplaceShuffle(choosenRows);
        
        return { rows: choosenRows, header, sheetName }
    }
}

module.exports = XlsxSampler;