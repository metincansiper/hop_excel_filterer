
const XlsxFilterer = require('./XlsxFilterer');
const path = require('path');

const DATA_PATH = path.join(process.cwd(), "data");
const getAbsPath = relPath => path.join(DATA_PATH, relPath);

const inputPath = getAbsPath("input.xlsx");
const handler = new XlsxFilterer(inputPath);
console.log(handler.getHeader())
const outputPath = getAbsPath("output.xlsx");
handler.exportToFile(outputPath);

