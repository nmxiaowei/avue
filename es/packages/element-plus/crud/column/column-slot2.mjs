/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { detail } from '../../../../src/core/detail.mjs';
import { DIC_PROPS, DIC_SHOW_SPLIT } from '../../../../src/global/variable.mjs';
import { sendDic } from '../../../../src/core/dic.mjs';
import { blankVal, isMediaType } from '../../../../src/utils/util.mjs';
import custom from '../../../core/components/form/custom.mjs';
import '../../../core/components/form/index.mjs';
import '../../../core/components/icon/index.mjs';
import '../grid/item.mjs';
import script$1 from '../../../core/components/icon/index2.mjs';
import script$2 from '../../../core/components/form/index2.mjs';
import script$3 from '../grid/item2.mjs';

let count = {};
var script = {
  name: "column-slot",
  inject: ["dynamic", "crud"],
  components: {
    custom,
    tableItemCard: script$3,
    formTemp: script$2,
    iconTemp: script$1,
  },
  props: {
    column: Object,
    columnOption: Array,
  },
  created() {
    const list = ["getColumnProp"];
    list.forEach((ele) => {
      if (this.dynamic) this[ele] = this.dynamic[ele];
    });
  },
  methods: {
    isMediaType(item, fileType) {
      return isMediaType(item, fileType);
    },
    validLabel(column, row, val) {
      if (column.rules && row.$cellEdit) {
        return val;
      }
    },
    columnChange(row, column, index) {
      let key = `${index}-${column.prop}`;
      if (!count[key]) {
        this.handleChange(column, row);
        if (typeof column.change === "function" && column.cell == true) {
          column.change({ row, column, index, value: row[column.prop] });
        }
      }
      count[key] = true;
      this.$nextTick(() => (count[key] = false));
    },
    handleChange(column, row) {
      if (!column.cascader) return;
      this.$nextTick(() => {
        [...this.crud.propOption];
        //本节点;
        const cascader = column.cascader;
        cascader.join(",");
        cascader.forEach((item) => {
          const columnNextProp = item;
          const value = row[column.prop];
          const rowIndex = row.$index;
          // 下一个节点
          const columnNext = this.findObject(this.columnOption, columnNextProp);
          if (this.validatenull(columnNext)) return;
          // 如果本节点没有字典则创建节点数组
          if (this.validatenull(this.crud.cascaderDIC[rowIndex])) {
            this.crud.cascaderDIC[rowIndex] = {};
          }
          if (this.crud.cascaderIndexList.includes(rowIndex)) {
            //清空子类字典
            cascader.forEach((ele) => {
              this.crud.cascaderDIC[rowIndex][ele] = [];
              cascader.forEach((ele) => {
                row[ele] = blankVal(row[ele]);
              });
            });
          }
          //最后一级
          if (
            this.validatenull(cascader) ||
            this.validatenull(value) ||
            this.validatenull(columnNext)
          ) {
            return;
          }
          sendDic(
            {
              column: columnNext,
              value: value,
              form: row,
            },
            this
          ).then((res) => {
            const dic = res || [];
            //首次加载的放入队列记录
            if (!this.crud.cascaderIndexList.includes(rowIndex)) {
              this.crud.cascaderIndexList.push(rowIndex);
            }
            if (!this.crud.cascaderDicList[rowIndex]) {
              this.crud.cascaderDicList[rowIndex] = {};
            }
            if (!this.crud.cascaderDicList[rowIndex][columnNextProp]) {
              this.crud.cascaderDicList[rowIndex][columnNextProp] = dic;
            }
            // 修改字典
            this.crud.cascaderDIC[rowIndex][columnNextProp] = dic;

            if (
              !this.validatenull(dic[columnNext.cascaderIndex]) &&
              !this.validatenull(dic) &&
              !this.validatenull(columnNext.cascaderIndex)
            ) {
              row[columnNextProp] =
                dic[columnNext.cascaderIndex][
                  (columnNext.props || {}).value || DIC_PROPS.value
                ];
            }
          });
        });
      });
    },
    handleDetail(row, column) {
      let result;
      let DIC = column.parentProp
        ? (this.crud.cascaderDIC[row.$index] || {})[column.prop]
        : this.crud.DIC[column.prop];
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC) && this.crud.tableOption.filterDic != true) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    corArray(row, column) {
      let list = this.handleDetail(row, column);
      if (!Array.isArray(list)) {
        list = this.validatenull(list) ? [] : list.split(DIC_SHOW_SPLIT);
      }
      return this.deepClone(list);
    },
    openImg(row, column, index) {
      let list = this.getImgList(row, column);
      list = list.map((ele) => {
        return { thumbUrl: ele, url: ele, type: column.fileType };
      });
      this.$ImagePreview(list, index);
    },
    getImgList(row, column) {
      let url = column.propsHttp?.home || "";
      let value = column.props?.value || DIC_PROPS.value;
      let list = this.corArray(row, column);
      list.forEach((ele, index) => {
        list[index] = url + (ele[value] ? ele[value] : ele);
      });
      return list;
    },
  },
};

export { script as default };
