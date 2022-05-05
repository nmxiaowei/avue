/* eslint-disable */

import { isJson, downFile, vaildData } from 'utils/util';
import packages from "core/packages";
import dayjs from 'dayjs'
export default {
  buildHeader (revealList) {
    let excelHeader = [];
    // 构建生成excel表头需要的数据结构
    this.getHeader(revealList, excelHeader, 0, 0);
    // 多行表头长短不一，短的向长的看齐，不够的补上行合并占位符
    let max = Math.max(...(excelHeader.map(a => a.length)))
    excelHeader.filter(e => e.length < max).forEach(
      e => this.pushRowSpanPlaceHolder(e, max - e.length))
    return excelHeader;
  },

  /**
   * 生成头部 
   * @param headers 展示的头部
   * @param excelHeader excel头部
   * @param deep 深度
   * @param perOffset 前置偏移量
   * @returns {number}  后置偏移量
   */
  getHeader (headers, excelHeader, deep, perOffset) {
    let offset = 0
    let cur = excelHeader[deep]
    if (!cur) {
      cur = excelHeader[deep] = []
    }
    // 填充行合并占位符
    this.pushRowSpanPlaceHolder(cur, perOffset - cur.length)
    for (let i = 0; i < headers.length; i++) {
      let head = headers[i]
      cur.push(head.label)
      if (head.hasOwnProperty('children') && Array.isArray(head.children)
        && head.children.length > 0) {
        let childOffset = this.getHeader(head.children, excelHeader, deep + 1,
          cur.length - 1)
        // 填充列合并占位符
        this.pushColSpanPlaceHolder(cur, childOffset - 1)
        offset += childOffset
      } else {
        offset++
      }
    }
    return offset;

  },
  /**
   * 填充行合并占位符
   * */
  pushRowSpanPlaceHolder (arr, count) {
    for (let i = 0; i < count; i++) {
      arr.push('!$ROW_SPAN_PLACEHOLDER')
    }
  },
  // 填充列合并占位符
  pushColSpanPlaceHolder (arr, count) {
    for (let i = 0; i < count; i++) {
      arr.push('!$COL_SPAN_PLACEHOLDER')
    }
  },
  doMerges (arr) {
    // 要么横向合并 要么纵向合并
    let deep = arr.length;
    let merges = [];
    for (let y = 0; y < deep; y++) {
      // 先处理横向合并
      let row = arr[y];
      let colSpan = 0
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '!$COL_SPAN_PLACEHOLDER') {
          row[x] = undefined;
          if (x + 1 === row.length) {
            merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x } })
          }
          colSpan++
        } else if (colSpan > 0 && x > colSpan) {
          merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } })
          colSpan = 0
        } else {
          colSpan = 0
        }
      }
    }
    // 再处理纵向合并
    let colLength = arr[0].length
    for (let x = 0; x < colLength; x++) {
      let rowSpan = 0
      for (let y = 0; y < deep; y++) {
        if (arr[y][x] === '!$ROW_SPAN_PLACEHOLDER') {
          arr[y][x] = undefined;
          if (y + 1 === deep) {
            merges.push({ s: { r: y - rowSpan, c: x }, e: { r: y, c: x } })
          }
          rowSpan++;
        } else if (rowSpan > 0 && y > rowSpan) {
          merges.push({ s: { r: y - rowSpan - 1, c: x }, e: { r: y - 1, c: x } })
          rowSpan = 0;
        } else {
          rowSpan = 0;
        }
      }
    }
    return merges;
  },

  /**
   * 从github复制过来的
   */
  aoa_to_sheet (data, headerRows) {
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
        /// 这里生成cell的时候，使用上面定义的默认样式
        const cell = {
          v: vaildData(data[R][C], ''),
          s: {
            font: { name: "宋体", sz: 11, color: { auto: 1, rgb: '000000' }, bold: true },
            alignment: {
              /// 自动换行
              wrapText: 1,
              // 居中
              horizontal: "center",
              vertical: "center",
              indent: 0
            }
          }
        };
        // 头部列表加边框
        if (R < headerRows) {
          cell.s.border = {
            top: { style: 'thin', color: { rgb: "EBEEF5" } },
            left: { style: 'thin', color: { rgb: "EBEEF5" } },
            bottom: { style: 'thin', color: { rgb: "EBEEF5" } },
            right: { style: 'thin', color: { rgb: "EBEEF5" } },
          };
          cell.s.fill = {
            patternType: 'solid',
            fgColor: { theme: 3, "tint": 0.3999755851924192, rgb: 'F5F7FA' },
            bgColor: { theme: 7, "tint": 0.3999755851924192, rgb: 'F5F7FA' }
          }
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
  s2ab (s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  },

  // 导出 excel
  excel (params) {
    if (!window.XLSX) {
      packages.logs("xlsx");
      return;
    }
    return new Promise((resolve, reject) => {

      // 合并参数
      const _params = {
        prop: []
      };

      // 从参数中派生数据
      _params.header = this.buildHeader(params.columns);
      _params.title = params.title || dayjs().format('YYYY-MM-DD HH:mm:ss');
      const callback = (list) => {
        list.forEach(ele => {
          if (ele.children && ele.children instanceof Array) {
            callback(ele.children)
          } else {
            _params.prop.push(ele.prop)
          }
        })
      }
      callback(params.columns)
      _params.data = params.data.map(row =>
        _params.prop.map(prop => {
          let data = row[prop];
          if (isJson(data)) data = JSON.stringify(data);
          return data;
        })
      );
      let headerRows = _params.header.length;
      _params.header.push(..._params.data, []);
      // 计算合并
      let merges = this.doMerges(_params.header)
      // 生成sheet
      let ws = this.aoa_to_sheet(_params.header, headerRows);
      // 单元格合并
      ws['!merges'] = merges;
      // 头部冻结
      ws["!freeze"] = {
        xSplit: "1",
        ySplit: "" + headerRows,
        topLeftCell: "B" + (headerRows + 1),
        activePane: "bottomRight",
        state: "frozen",
      };
      // 列宽
      ws['!cols'] = [{ wpx: 165 }];
      let workbook = {
        SheetNames: ['Sheet1'],
        Sheets: {}
      };
      workbook.Sheets.Sheet1 = ws;
      // excel样式
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
        cellStyles: true
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([this.s2ab(wbout)], { type: "application/octet-stream" });
      downFile(blob, _params.title + '.xlsx')
      resolve();
    });
  },// 导入 xlsx
  xlsx (file) {
    if (!window.saveAs || !window.XLSX) {
      packages.logs("file-saver");
      packages.logs("xlsx");
      return;
    }
    const xlsx = window.XLSX;
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const fixdata = data => {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
      const getHeaderRow = sheet => {
        const headers = []
        const range = xlsx.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        for (C = range.s.c; C <= range.e.c; ++C) {
          var cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })]
          var hdr = 'UNKNOWN ' + C
          if (cell && cell.t) hdr = xlsx.utils.format_cell(cell)
          headers.push(hdr)
        }
        return headers
      }
      reader.onload = e => {
        const data = e.target.result
        const fixedData = fixdata(data)
        const workbook = xlsx.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = getHeaderRow(worksheet)
        const results = xlsx.utils.sheet_to_json(worksheet)
        resolve({ header, results })
      }
      reader.readAsArrayBuffer(file)
    })
  }
}