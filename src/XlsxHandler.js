const XLSX = require("xlsx");
const _ = require('lodash');

class XlsxHandler {
    constructor(inputPath) {
        const { rows, header, sheetName } = this.getData(inputPath);
        this.rows = rows;
        this.header = header;
        this.sheetName = sheetName;
    }

    getData(inputPath) {
        console.log('here2');
        const workbook = XLSX.readFile(inputPath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const header = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
        let rows = XLSX.utils.sheet_to_json(worksheet);
        
        return { rows, header, sheetName };
    }

    getRows() {
        return this.rows;
    }

    getHeader() {
        return this.header;
    }

    getSheetName() {
        return this.sheetName;
    }

    exportToFile(outputPath) {
        const header = this.header;
        const worksheet  = XLSX.utils.json_to_sheet(this.rows, { header });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, this.sheetName);
        XLSX.writeFile(workbook, outputPath);
    }
}

module.exports = XlsxHandler;