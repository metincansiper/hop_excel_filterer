const XlsxSampler = require('./XlsxSampler');
const path = require('path');

const inputPath = path.join(process.cwd(), "data", "input.xlsx");
const xlsxHandler = new XlsxSampler(inputPath);
const outputPath = path.join(process.cwd(), "test", "data", "input.xlsx");
xlsxHandler.exportToFile(outputPath);