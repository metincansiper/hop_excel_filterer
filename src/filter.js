const _ = require('lodash');

const INCLUDED_CTYPES = new Set([
    'boolean',
    'text_choice',
    'numeric',
    'datetime',
    'text'
]);

const INCLUDED_CTASK_IDS = new Set([
    '6255ace1091cc019c98ed1be',
    '5bbb674202098e0100d424bf',
    '5a97175b3468f201007a26dc',
    '5dd47a5f9565fd010097c89f',
    '5f978794a539a80100fed1f0',
    '5bc3f5a8da5a270100d8d8f1',
    '5bbb6e89948195010051058e'
]);

const INCLUDED_COLUMNS = new Set([
    'c_text',
    'c_type',
    'c_unit',
    '_id',
    'c_description',
    'c_maximum',
    'c_minimum',
    'c_name',
    'c_order',
    'c_parent_step._id',
    'c_question',
    'c_task._id',
    'c_task._path'
]);

const INCLUDED_COLUMN_POSTFIXES = [
    '].c_value',
    '].c_order'
];

const shouldIncludeRow = row => {
    const ctype = row.c_type;
    const ctaskId = row['c_task._id']
    return INCLUDED_CTYPES.has(ctype) && INCLUDED_CTASK_IDS.has(ctaskId);
};

const shouldIncludeColumn = colName => {
    if ( INCLUDED_COLUMNS.has(colName) ) {
        return true;
    }

    for ( let i = 0; i < INCLUDED_COLUMN_POSTFIXES.length; i++ ) {
        postfix = INCLUDED_COLUMN_POSTFIXES[i];
        if ( _.endsWith(colName, postfix) ) {
            return true;
        }
    }

    return false;
};

const getIncludedColNames = header => {
    const includedNames = [];
    header.forEach((colName) => {
        if ( shouldIncludeColumn(colName) ) {
            includedNames.push(colName);
        }
    });

    return includedNames;
};

module.exports = { shouldIncludeRow, getIncludedColNames, shouldIncludeColumn };