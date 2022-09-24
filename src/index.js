const path = require('path');
const XlsxFilterer = require('./XlsxFilterer');

const DATA_PATH = path.join(process.cwd(), "data");
const getAbsPath = relPath => path.join(DATA_PATH, relPath);

const inputPath = getAbsPath("input.xlsx");
const handler = new XlsxFilterer(inputPath);
const outputPath = getAbsPath("output.xlsx");
handler.exportToFile(outputPath);

