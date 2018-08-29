import * as utils from '../utils/util.js';
import moment from 'moment';
export default function() {
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
                let result = row[column.prop] || '';
                if (column.type) {
                    if (
                        (column.type === 'date' ||
                            column.type === 'time' ||
                            column.type === 'datetime') &&
                        column.format
                    ) {
                        const format = column.format
                            .replace('dd', 'DD')
                            .replace('yyyy', 'YYYY');
                        result = moment(result).format(format);
                    }
                    if (column.dicData) {
                        result = this.findByvalue(
                            typeof column.dicData === 'string' ?
                            this.DIC[column.dicData] :
                            column.dicData,
                            result,
                            (column.props || this.tableOption.props)
                        );
                    }
                }
                if (column.formatter && typeof column.formatter === 'function') {
                    result = column.formatter(row, row[column.prop], result, column);
                }
                return result;
            },
        }
    }
}