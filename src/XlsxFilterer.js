const XlsxHandler = require('./XlsxHandler');
const _ = require('lodash');
const { shouldIncludeRow, getIncludedColNames } = require('./filter')

class XlsxFilterer extends XlsxHandler {
    constructor(inputPath) {
        super(inputPath);
    }

    getData(inputPath) {
        console.log('here');
        let {header, rows, sheetName} = super.getData(inputPath);
        const includedColNames = getIncludedColNames(header);
        console.log(includedColNames)
        const includedColNamesSet = new Set(includedColNames);
        rows = _.filter(rows, shouldIncludeRow);
        const shouldInclude = (col, colName) => includedColNamesSet.has(colName);
        rows = _.map( rows, row => _.pickBy(row, shouldInclude) );
        
        return { rows, header: includedColNames, sheetName }
    }
}

module.exports = XlsxFilterer;