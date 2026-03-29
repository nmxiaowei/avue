// @ts-nocheck
/* eslint-disable */

import './_blob';

declare global {
  interface Window {
    saveAs: any;
    XLSX: any;
  }
}

const saveAs = window.saveAs;
const XLSX = window.XLSX;

function generateArray(table: HTMLElement) {
  const out: any[] = [];
  const rows = table.querySelectorAll('tr');
  const ranges: any[] = [];
  for (let R = 0; R < rows.length; ++R) {
    const outRow: any[] = [];
    const row = rows[R];
    const columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      const cell = columns[C] as HTMLElement;
      let colspan: any = cell.getAttribute('colspan');
      let rowspan: any = cell.getAttribute('rowspan');
      let cellValue: any = cell.innerText;
      if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue;

      ranges.forEach(function (range) {
        if (
          R >= range.s.r &&
          R <= range.e.r &&
          outRow.length >= range.s.c &&
          outRow.length <= range.e.c
        ) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: { r: R, c: outRow.length },
          e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 }
        });
      }

      outRow.push(cellValue !== '' ? cellValue : null);

      if (colspan) for (let k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function datenum(v: any, date1904: any) {
  if (date1904) v += 1462;
  const epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30)) as any) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data: any[][]) {
  const ws: Record<string, any> = {};
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      const cell: any = { v: data[R][C] };
      if (cell.v == null) continue;
      const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v, false);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook(this: any) {
  if (!(this instanceof Workbook)) return new (Workbook as any)();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function export_table_to_excel(id: string) {
  const theTable = document.getElementById(id)!;
  const oo = generateArray(theTable);
  const ranges = oo[1];
  const data = oo[0];
  const ws_name = 'SheetJS';

  const wb: any = new (Workbook as any)();
  const ws = sheet_from_array_of_arrays(data);

  ws['!merges'] = ranges;

  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
    'test.xlsx'
  );
}

export function export_json_to_excel(
  th: any[],
  jsonData: any[][],
  defaultTitle?: string,
  options: { merges?: any[]; header?: string | null } = { merges: [], header: null }
) {
  const data = jsonData;
  data.unshift(th);
  if (options.header) data.unshift([options.header]);
  const ws_name = 'SheetJS';

  const wb: any = new (Workbook as any)();
  const ws = sheet_from_array_of_arrays(data);

  let { merges = [] } = options;
  if (typeof merges[0] == 'string' && merges.length == 2) merges = [merges];
  merges = merges.map((i: any) => (i instanceof Array ? { s: i[0], e: i[1] } : i));
  ws['!merges'] = merges;

  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  const title = defaultTitle || '列表';
  saveAs(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
    title + '.xlsx'
  );
}
