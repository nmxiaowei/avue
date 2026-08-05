/* eslint-disable */

import { isJson, downFile, validData } from 'utils/util';
import packages from 'core/packages';
import dayjs from 'dayjs';

declare global {
  interface Window {
    XLSX: any;
    saveAs: any;
  }
}

const getXLSX = () => (typeof window === 'undefined' ? undefined : window.XLSX);

const EXCEL_COLORS = {
  header: 'FFE2F0D9',
  headerText: 'FF245B36',
  headerBorder: 'FFB7D7A8',
  border: 'FFE5E7EB',
  stripe: 'FFF4FAF0',
  text: 'FF1F2937'
};

const getTextWidth = (value: any) => {
  return Array.from(String(validData(value, ''))).reduce(
    (width, char) => width + (char.charCodeAt(0) > 255 ? 2 : 1),
    0
  );
};

const getColumnWidths = (data: any[][], columnCount: number) => {
  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const width = data.reduce((maxWidth, row) => {
      return Math.max(maxWidth, getTextWidth(row[columnIndex]));
    }, 10);
    return { wch: Math.min(Math.max(width + 2, 12), 36) };
  });
};

const createBorder = (color: string) => ({
  top: { style: 'thin', color: { rgb: color } },
  left: { style: 'thin', color: { rgb: color } },
  bottom: { style: 'thin', color: { rgb: color } },
  right: { style: 'thin', color: { rgb: color } }
});

const createCellStyle = (isHeader: boolean, isStripe: boolean, value: any) => {
  if (isHeader) {
    return {
      font: { name: 'Microsoft YaHei', sz: 11, color: { rgb: EXCEL_COLORS.headerText }, bold: true },
      fill: { patternType: 'solid', fgColor: { rgb: EXCEL_COLORS.header } },
      border: createBorder(EXCEL_COLORS.headerBorder),
      alignment: { wrapText: true, horizontal: 'center', vertical: 'center' }
    };
  }
  const style: Record<string, any> = {
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

export default {
  buildHeader(revealList: any[]) {
    const excelHeader: any[] = [];
    this.getHeader(revealList, excelHeader, 0, 0);
    const max = Math.max(...excelHeader.map((a: any[]) => a.length));
    excelHeader
      .filter((e: any[]) => e.length < max)
      .forEach((e: any[]) => this.pushRowSpanPlaceHolder(e, max - e.length));
    return excelHeader;
  },

  getHeader(headers: any[], excelHeader: any[], deep: number, perOffset: number) {
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
      } else {
        offset++;
      }
    }
    return offset;
  },

  pushRowSpanPlaceHolder(arr: any[], count: number) {
    for (let i = 0; i < count; i++) {
      arr.push('!$ROW_SPAN_PLACEHOLDER');
    }
  },

  pushColSpanPlaceHolder(arr: any[], count: number) {
    for (let i = 0; i < count; i++) {
      arr.push('!$COL_SPAN_PLACEHOLDER');
    }
  },

  doMerges(arr: any[][]) {
    const deep = arr.length;
    const merges: any[] = [];
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
        } else if (colSpan > 0 && x > colSpan) {
          merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } });
          colSpan = 0;
        } else {
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
        } else if (rowSpan > 0 && y > rowSpan) {
          merges.push({ s: { r: y - rowSpan - 1, c: x }, e: { r: y - 1, c: x } });
          rowSpan = 0;
        } else {
          rowSpan = 0;
        }
      }
    }
    return merges;
  },

  aoa_to_sheet(data: any[][], headerRows: number, xlsx: any) {
    const ws: Record<string, any> = {};
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
        const value = validData(data[R][C], '');
        const cell: any = {
          v: value,
          s: createCellStyle(R < headerRows, R >= headerRows && (R - headerRows) % 2 === 1, value)
        };
        const cell_ref = xlsx.utils.encode_cell({ c: C, r: R });
        if (typeof cell.v === 'number') {
          cell.t = 'n';
        } else if (typeof cell.v === 'boolean') {
          cell.t = 'b';
        } else {
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

  s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  },

  excel(params: any) {
    const xlsx = getXLSX();
    if (!xlsx) {
      packages.logs('xlsx');
      return;
    }
    return new Promise<void>((resolve) => {
      const _params: any = {
        prop: []
      };

      _params.header = this.buildHeader(params.columns);
      _params.title = params.title || dayjs().format('YYYY-MM-DD HH:mm:ss');
      const callback = (list: any[]) => {
        list.forEach((ele) => {
          if (ele.children && ele.children instanceof Array) {
            callback(ele.children);
          } else {
            _params.prop.push(ele.prop);
          }
        });
      };
      callback(params.columns);
      _params.data = params.data.map((row: any) =>
        _params.prop.map((prop: string) => {
          let data = row[prop];
          if (isJson(data)) data = JSON.stringify(data);
          return data;
        })
      );
      const headerRows = _params.header.length;
      _params.header.push(..._params.data, []);
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
      ws['!rows'] = _params.header.map((_row: any[], index: number) => ({
        hpt: index < headerRows ? 26 : index === _params.header.length - 1 ? 8 : 20
      }));
      if (_params.data.length > 0 && _params.prop.length > 0) {
        ws['!autofilter'] = {
          ref: `A${headerRows}:${xlsx.utils.encode_col(_params.prop.length - 1)}${headerRows + _params.data.length}`
        };
      }
      const workbook: any = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {
          Title: _params.title,
          CreatedDate: new Date()
        }
      };
      workbook.Sheets.Sheet1 = ws;
      const wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
        cellStyles: true
      };
      const wbout = xlsx.write(workbook, wopts);
      const blob = new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' });
      downFile(blob, _params.title + '.xlsx');
      resolve();
    });
  },

  xlsx(file: File) {
    if (typeof window === 'undefined' || !window.saveAs || !window.XLSX) {
      packages.logs('file-saver');
      packages.logs('xlsx');
      return;
    }
    const xlsx = window.XLSX;
    return new Promise<{ header: any[]; results: any[] }>((resolve) => {
      const reader = new FileReader();
      const fixdata = (data: ArrayBuffer) => {
        let o = '';
        let l = 0;
        const w = 10240;
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, Array.from(new Uint8Array(data.slice(l * w, l * w + w))) as any);
        }
        o += String.fromCharCode.apply(null, Array.from(new Uint8Array(data.slice(l * w))) as any);
        return o;
      };
      const getHeaderRow = (sheet: any) => {
        const headers = [];
        const range = xlsx.utils.decode_range(sheet['!ref']);
        const R = range.s.r;
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
          let hdr = 'UNKNOWN ' + C;
          if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
          headers.push(hdr);
        }
        return headers;
      };
      reader.onload = (e) => {
        const data = e.target!.result as ArrayBuffer;
        const fixedData = fixdata(data);
        const workbook = xlsx.read(btoa(fixedData), { type: 'base64' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const header = getHeaderRow(worksheet);
        const results = xlsx.utils.sheet_to_json(worksheet);
        resolve({ header, results });
      };
      reader.readAsArrayBuffer(file);
    });
  }
};
