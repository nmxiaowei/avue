/* eslint-disable */

// 库
import * as Excel from './_export2Excel';
import { isJson } from 'utils/util';
import packages from "core/packages";
export default {
  install (Vue, options) {
    Vue.prototype.$export = {
      // 导出 excel
      excel (params) {
        if (!window.saveAs || !window.XLSX) {
          packages.logs("file-saver");
          packages.logs("xlsx");
          return;
        }
        return new Promise((resolve, reject) => {
          // 默认值
          const paramsDefault = {
            columns: [],
            data: [],
            title: 'table',
            header: null,
            merges: []
          };
          // 合并参数
          const _params = Object.assign({}, paramsDefault, params);
          // 从参数中派生数据
          const header = _params.columns.map(e => e.label);
          const data = _params.data.map(row =>
            _params.columns.map(col => {
              let data = row[col.prop];
              if (isJson(data)) {
                data = JSON.stringify(data);
              }
              return data;
            })
          );
          // 导出
          Excel.export_json_to_excel(header, data, _params.title, {
            merges: _params.merges,
            header: _params.header
          });
          // 完成
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
  }
};
