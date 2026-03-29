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

const XLSX = window.XLSX;

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

  aoa_to_sheet(data: any[][], headerRows: number) {
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
        const cell: any = {
          v: validData(data[R][C], ''),
          s: {
            font: { name: '宋体', sz: 11, color: { auto: 1, rgb: '000000' }, bold: true },
            alignment: {
              wrapText: 1,
              horizontal: 'center',
              vertical: 'center',
              indent: 0
            }
          }
        };
        if (R < headerRows) {
          cell.s.border = {
            top: { style: 'thin', color: { rgb: 'EBEEF5' } },
            left: { style: 'thin', color: { rgb: 'EBEEF5' } },
            bottom: { style: 'thin', color: { rgb: 'EBEEF5' } },
            right: { style: 'thin', color: { rgb: 'EBEEF5' } }
          };
          cell.s.fill = {
            patternType: 'solid',
            fgColor: { theme: 3, tint: 0.3999755851924192, rgb: 'F5F7FA' },
            bgColor: { theme: 7, tint: 0.3999755851924192, rgb: 'F5F7FA' }
          };
        }
        const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
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
      ws['!ref'] = XLSX.utils.encode_range(range);
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
    if (!window.XLSX) {
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
      const ws = this.aoa_to_sheet(_params.header, headerRows);
      ws['!merges'] = merges;
      ws['!freeze'] = {
        xSplit: '1',
        ySplit: '' + headerRows,
        topLeftCell: 'B' + (headerRows + 1),
        activePane: 'bottomRight',
        state: 'frozen'
      };
      ws['!cols'] = [{ wpx: 165 }];
      const workbook: any = {
        SheetNames: ['Sheet1'],
        Sheets: {}
      };
      workbook.Sheets.Sheet1 = ws;
      const wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
        cellStyles: true
      };
      const wbout = XLSX.write(workbook, wopts);
      const blob = new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' });
      downFile(blob, _params.title + '.xlsx');
      resolve();
    });
  },

  xlsx(file: File) {
    if (!window.saveAs || !window.XLSX) {
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
