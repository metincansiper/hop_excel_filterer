const fs = require('fs')
const assert = require('assert');
const expect = require('chai').expect
const path = require('path');
const _ = require('lodash');
const XlsxFilterer = require('../src/XlsxFilterer');
const XlsxHandler = require('../src/XlsxHandler');
const { shouldIncludeRow, getIncludedColNames, shouldIncludeColumn } = require('../src/filter');

const TEST_DATA_PATH = path.join(process.cwd(), "test", "data");

const getAbsPath = (relPath) => {
  return path.join(TEST_DATA_PATH, relPath);
};

describe('Filter and Export', function () {
  it('test filtered rows', function(){
    const inputPath = getAbsPath("input.xlsx");
    const xlsxFilterer = new XlsxFilterer(inputPath);

    const rows = xlsxFilterer.getRows();
    assert.equal(rows.length, 5);

    rows.forEach( row => {
      expect(shouldIncludeRow(row)).to.be.true;
    } );
  });

  it('test filtered header', function(){
    const inputPath = getAbsPath("input.xlsx");
    const xlsxFilterer = new XlsxFilterer(inputPath);

    const header = xlsxFilterer.getHeader();
    header.forEach(col => {
      expect(shouldIncludeColumn(col)).to.be.true;
    });

    const headerColSet = new Set(header);
    const xlsxHandler = new XlsxHandler(inputPath);
    const unfilteredHeader = xlsxHandler.getHeader();
    const expectedHeader = _.filter(unfilteredHeader, col => headerColSet.has(col));

    expect(expectedHeader).to.eql(header); 
  });

  it('test exported file', function(){
    const inputPath = getAbsPath("input.xlsx");
    const xlsxFilterer = new XlsxFilterer(inputPath);

    const outputPath = getAbsPath("output.xlsx");
    xlsxFilterer.exportToFile(outputPath);

    const xlsxHandler = new XlsxHandler(outputPath);
    expect(xlsxHandler.getRows()).to.eql(xlsxFilterer.getRows()); 
  });
});