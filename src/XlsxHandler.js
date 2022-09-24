const XLSX = require("xlsx");
const _ = require('lodash');
// const { shouldIncludeRow, getIncludedColNames } = require('./filter')

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
        // const includedColNames = filter ? getIncludedColNames(header) : header;
        // if (filter) {
        //     const includedColNamesSet = new Set(includedColNames);
        //     rows = _.filter(rows, shouldIncludeRow);
        //     const shouldInclude = (col, colName) => includedColNamesSet.has(colName);
        //     rows = _.map( rows, row => _.pickBy(row, shouldInclude) );
        // }
        
        
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

// class XlsxHandler {
//     constructor(inputPath) {
//         const { rows, includedColNames } = this.getData(inputPath);
//         this.rows = rows;
//         this.outputHeader = includedColNames;
//     }

//     getData(inputPath, filter=true) {
//         const workbook = XLSX.readFile(inputPath);
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const header = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
//         let rows = XLSX.utils.sheet_to_json(worksheet);
//         const includedColNames = filter ? getIncludedColNames(header) : header;
//         if (filter) {
//             const includedColNamesSet = new Set(includedColNames);
//             rows = _.filter(rows, shouldIncludeRow);
//             const shouldInclude = (col, colName) => includedColNamesSet.has(colName);
//             rows = _.map( rows, row => _.pickBy(row, shouldInclude) );
//         }
        
        
//         return { rows, includedColNames }
//     }

//     getRows() {
//         return this.rows;
//     }

//     getHeader() {
//         return this.outputHeader;
//     }

//     exportToFile(outputPath, rows) {
//         const header = this.outputHeader;
//         const worksheet  = XLSX.utils.json_to_sheet(rows || this.rows, { header });
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//         XLSX.writeFile(workbook, outputPath);
//     }
// }

module.exports = XlsxHandler;