import * as utils from '../utils/util.js';
import { validatenull } from '../utils/validate.js';
import dayjs from 'dayjs';
export default function () {
    return {
        methods: {
            initFun() {
                Object.keys(utils).forEach(key => {
                    this[key] = utils[key];
                });
            },
            cellEditFlag(row, column) {
                return row.$cellEdit && [undefined, 'select', 'input'].includes(column.type) && column.solt !== true && column.cell;
            },
            // 处理数据
            detail(row, column) {
                let result = row[column.prop || column.value];
                let type = column.type;
                if (validatenull(result)) result = ''
                // 自定义格式化
                if (column.formatter && typeof column.formatter === 'function') {
                    result = column.formatter(row, row[column.prop], result, column);
                }
                // 日期处理
                if (['date', 'time', 'datetime'].includes(type) && column.format) {
                    const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
                    result = dayjs(result).format(format);
                }
                // 密码处理
                if (['password'].includes(type)) {
                    result = getPasswordChar(result.toString().length, '*');
                }
                //字典处理
                if (column.dicData || column.dicUrl) {
                    result = this.findByvalue(
                        this.DIC[column.prop],
                        result,
                        (column.props || this.tableOption.props)
                    );
                }

                return result;
            },
        }
    }
}