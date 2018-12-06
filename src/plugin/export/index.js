/* eslint-disable */

// 库
import * as Excel from './_export2Excel';
import { isJson } from 'utils/util';
export default {
  install(Vue, options) {
    Vue.prototype.$export = {
      // 导出 excel
      excel(params) {
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
      }
    };
  }
};
