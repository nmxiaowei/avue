/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_utils_util = require('../../utils/util.js');
var src_core_packages = require('../../core/packages.js');
var dayjs_min = require('../../../_virtual/dayjs.min.js');

/* eslint-disable */
const getXLSX = () => (typeof window === 'undefined' ? undefined : window.XLSX);
const EXCEL_COLORS = {
    header: 'FFE2F0D9',
    headerText: 'FF245B36',
    headerBorder: 'FFB7D7A8',
    border: 'FFE5E7EB',
    stripe: 'FFF4FAF0',
    text: 'FF1F2937'
};
const getTextWidth = (value) => {
    return Array.from(String(src_utils_util.validData(value, ''))).reduce((width, char) => width + (char.charCodeAt(0) > 255 ? 2 : 1), 0);
};
const getColumnWidths = (data, columnCount) => {
    return Array.from({ length: columnCount }, (_, columnIndex) => {
        const width = data.reduce((maxWidth, row) => {
            return Math.max(maxWidth, getTextWidth(row[columnIndex]));
        }, 10);
        return { wch: Math.min(Math.max(width + 2, 12), 36) };
    });
};
const createBorder = (color) => ({
    top: { style: 'thin', color: { rgb: color } },
    left: { style: 'thin', color: { rgb: color } },
    bottom: { style: 'thin', color: { rgb: color } },
    right: { style: 'thin', color: { rgb: color } }
});
const createCellStyle = (isHeader, isStripe, value) => {
    if (isHeader) {
        return {
            font: { name: 'Microsoft YaHei', sz: 11, color: { rgb: EXCEL_COLORS.headerText }, bold: true },
            fill: { patternType: 'solid', fgColor: { rgb: EXCEL_COLORS.header } },
            border: createBorder(EXCEL_COLORS.headerBorder),
            alignment: { wrapText: true, horizontal: 'center', vertical: 'center' }
        };
    }
    const style = {
        font: { name: 'Microsoft YaHei', sz: 10, color: { rgb: EXCEL_COLORS.text } },
        border: createBorder(EXCEL_COLORS.border),
        alignment: {
            wrapText: true,
            horizontal: typeof value === 'number' ? 'right' : 'left',
            vertical: 'center'
        }
    };
    if (isStripe) {
        style.fill = { patternType: 'solid', fgColor: { rgb: EXCEL_COLORS.stripe } };
    }
    return style;
};
var $Export = {
    buildHeader(revealList) {
        const excelHeader = [];
        this.getHeader(revealList, excelHeader, 0, 0);
        const max = Math.max(...excelHeader.map((a) => a.length));
        excelHeader
            .filter((e) => e.length < max)
            .forEach((e) => this.pushRowSpanPlaceHolder(e, max - e.length));
        return excelHeader;
    },
    getHeader(headers, excelHeader, deep, perOffset) {
        let offset = 0;
        let cur = excelHeader[deep];
        if (!cur) {
            cur = excelHeader[deep] = [];
        }
        this.pushRowSpanPlaceHolder(cur, perOffset - cur.length);
        for (let i = 0; i < headers.length; i++) {
            const head = headers[i];
            cur.push(head.label);
            if (head.hasOwnProperty('children') && Array.isArray(head.children) && head.children.length > 0) {
                const childOffset = this.getHeader(head.children, excelHeader, deep + 1, cur.length - 1);
                this.pushColSpanPlaceHolder(cur, childOffset - 1);
                offset += childOffset;
            }
            else {
                offset++;
            }
        }
        return offset;
    },
    pushRowSpanPlaceHolder(arr, count) {
        for (let i = 0; i < count; i++) {
            arr.push('!$ROW_SPAN_PLACEHOLDER');
        }
    },
    pushColSpanPlaceHolder(arr, count) {
        for (let i = 0; i < count; i++) {
            arr.push('!$COL_SPAN_PLACEHOLDER');
        }
    },
    doMerges(arr) {
        const deep = arr.length;
        const merges = [];
        for (let y = 0; y < deep; y++) {
            const row = arr[y];
            let colSpan = 0;
            for (let x = 0; x < row.length; x++) {
                if (row[x] === '!$COL_SPAN_PLACEHOLDER') {
                    row[x] = undefined;
                    if (x + 1 === row.length) {
                        merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x } });
                    }
                    colSpan++;
                }
                else if (colSpan > 0 && x > colSpan) {
                    merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } });
                    colSpan = 0;
                }
                else {
                    colSpan = 0;
                }
            }
        }
        const colLength = arr[0].length;
        for (let x = 0; x < colLength; x++) {
            let rowSpan = 0;
            for (let y = 0; y < deep; y++) {
                if (arr[y][x] === '!$ROW_SPAN_PLACEHOLDER') {
                    arr[y][x] = undefined;
                    if (y + 1 === deep) {
                        merges.push({ s: { r: y - rowSpan, c: x }, e: { r: y, c: x } });
                    }
                    rowSpan++;
                }
                else if (rowSpan > 0 && y > rowSpan) {
                    merges.push({ s: { r: y - rowSpan - 1, c: x }, e: { r: y - 1, c: x } });
                    rowSpan = 0;
                }
                else {
                    rowSpan = 0;
                }
            }
        }
        return merges;
    },
    aoa_to_sheet(data, headerRows, xlsx) {
        const ws = {};
        const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
                if (range.s.r > R) {
                    range.s.r = R;
                }
                if (range.s.c > C) {
                    range.s.c = C;
                }
                if (range.e.r < R) {
                    range.e.r = R;
                }
                if (range.e.c < C) {
                    range.e.c = C;
                }
                const value = src_utils_util.validData(data[R][C], '');
                const cell = {
                    v: value,
                    s: createCellStyle(R < headerRows, R >= headerRows && (R - headerRows) % 2 === 1, value)
                };
                const cell_ref = xlsx.utils.encode_cell({ c: C, r: R });
                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                }
                else if (typeof cell.v === 'boolean') {
                    cell.t = 'b';
                }
                else {
                    cell.t = 's';
                }
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = xlsx.utils.encode_range(range);
        }
        return ws;
    },
    s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    },
    excel(params = {}) {
        const xlsx = getXLSX();
        if (!xlsx) {
            src_core_packages.default.logs('xlsx');
            return Promise.reject(new Error('未检测到 xlsx，请先引入 xlsx。'));
        }
        try {
            const columns = Array.isArray(params.columns) ? params.columns : [];
            const rows = Array.isArray(params.data) ? params.data : [];
            if (!columns.length)
                throw new Error('导出 Excel 至少需要一列配置。');
            const _params = {
                prop: []
            };
            _params.header = this.buildHeader(columns);
            _params.title = params.title || dayjs_min.default().format('YYYY-MM-DD HH:mm:ss');
            const callback = (list) => {
                list.forEach((ele) => {
                    if (ele.children && ele.children instanceof Array) {
                        callback(ele.children);
                    }
                    else {
                        _params.prop.push(ele.prop);
                    }
                });
            };
            callback(columns);
            if (!_params.prop.length)
                throw new Error('导出 Excel 未找到有效字段。');
            _params.data = rows.map((row) => _params.prop.map((prop) => {
                let data = row ? row[prop] : '';
                if (src_utils_util.isJson(data))
                    data = JSON.stringify(data);
                return data;
            }));
            const headerRows = _params.header.length;
            _params.header.push(..._params.data);
            const merges = this.doMerges(_params.header);
            const ws = this.aoa_to_sheet(_params.header, headerRows, xlsx);
            ws['!merges'] = merges;
            ws['!freeze'] = {
                xSplit: '1',
                ySplit: '' + headerRows,
                topLeftCell: 'B' + (headerRows + 1),
                activePane: 'bottomRight',
                state: 'frozen'
            };
            ws['!cols'] = getColumnWidths(_params.header, _params.prop.length);
            ws['!rows'] = _params.header.map((_row, index) => ({
                hpt: index < headerRows ? 26 : 20
            }));
            if (_params.data.length > 0 && _params.prop.length > 0) {
                ws['!autofilter'] = {
                    ref: `A${headerRows}:${xlsx.utils.encode_col(_params.prop.length - 1)}${headerRows + _params.data.length}`
                };
            }
            const workbook = {
                SheetNames: [params.sheetName || 'Sheet1'],
                Sheets: {},
                Props: {
                    Title: _params.title,
                    CreatedDate: new Date()
                }
            };
            workbook.Sheets[workbook.SheetNames[0]] = ws;
            const wopts = {
                bookType: 'xlsx',
                bookSST: false,
                type: 'array',
                cellStyles: true
            };
            const wbout = xlsx.write(workbook, wopts);
            const blob = new Blob([wbout], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const filename = String(params.filename || _params.title).replace(/[\\/:*?"<>|]/g, '-') + '.xlsx';
            src_utils_util.downFile(blob, filename);
            return Promise.resolve({ filename, sheetName: workbook.SheetNames[0], rows: _params.data.length });
        }
        catch (error) {
            return Promise.reject(error instanceof Error ? error : new Error(String(error || 'Excel 导出失败。')));
        }
    },
    xlsx(file, options = {}) {
        if (typeof window === 'undefined' || !window.XLSX) {
            src_core_packages.default.logs('xlsx');
            return Promise.reject(new Error('未检测到 xlsx，请先引入 xlsx。'));
        }
        if (!(file instanceof File))
            return Promise.reject(new TypeError('请传入有效的 Excel 文件。'));
        const xlsx = window.XLSX;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const getHeaderRow = (sheet, rowIndex) => {
                const headers = [];
                const range = xlsx.utils.decode_range(sheet['!ref']);
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: rowIndex })];
                    let hdr = 'UNKNOWN ' + C;
                    if (cell && cell.t)
                        hdr = xlsx.utils.format_cell(cell);
                    headers.push(hdr);
                }
                return headers;
            };
            reader.onload = (e) => {
                try {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: 'array', cellDates: true });
                    const sheetName = options.sheetName || workbook.SheetNames[Number(options.sheetIndex) || 0];
                    const worksheet = workbook.Sheets[sheetName];
                    if (!worksheet || !worksheet['!ref'])
                        throw new Error('未找到可读取的工作表。');
                    const headerRow = Math.max(0, Number(options.headerRow) || 0);
                    const header = getHeaderRow(worksheet, headerRow);
                    const results = xlsx.utils.sheet_to_json(worksheet, {
                        range: headerRow,
                        raw: options.raw === true,
                        defval: options.defval === undefined ? '' : options.defval
                    });
                    resolve({ header, results, sheetName });
                }
                catch (error) {
                    reject(error instanceof Error ? error : new Error(String(error || 'Excel 解析失败。')));
                }
            };
            reader.onerror = () => reject(new Error('Excel 文件读取失败。'));
            reader.onabort = () => reject(new Error('Excel 文件读取已取消。'));
            reader.readAsArrayBuffer(file);
        });
    }
};

exports.default = $Export;
