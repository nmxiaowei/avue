/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import './column-dynamic.mjs';
import './column-slot.mjs';
import { arraySort } from '../../../../src/utils/util.mjs';
import { DIC_PROPS } from '../../../../src/global/variable.mjs';
import script$1 from './column-dynamic2.mjs';
import script$2 from './column-slot2.mjs';

var script = create({
  name: "crud",
  data() {
    return {};
  },
  components: {
    columnSlot: script$2,
    columnDynamic: script$1,
  },
  inject: ["crud"],
  provide() {
    return {
      crud: this.crud,
      dynamic: this,
    };
  },
  props: {
    columnOption: Array,
  },
  computed: {
    list() {
      let result = [...this.columnOption];
      result = arraySort(
        result,
        "index",
        (a, b) =>
          this.crud.objectOption[a.prop]?.index -
          this.crud.objectOption[b.prop]?.index
      );
      return result;
    },
  },
  methods: {
    //表格筛选逻辑
    handleFilterMethod(params) {
      const { value, row, column } = params;
      if (typeof column.filterMethod === "function") {
        return column.filterMethod(value, row, column);
      } else {
        return row[column.prop] == value;
      }
    },
    //表格筛选字典
    handleFilters(column) {
      if (Array.isArray(column.filters))
        return column.filters.map((ele) => ({
          text: ele.label,
          value: ele.value,
        }));
      if (column.filters !== true) return undefined;
      let DIC = this.crud.DIC[column.prop] || [];
      let list = [];
      if (!this.validatenull(DIC)) {
        DIC.forEach((ele) => {
          const props = column.props || this.crud.tableOption.props || {};
          list.push({
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value],
          });
        });
      } else {
        this.crud.cellForm.list.forEach((ele) => {
          if (!list.map((item) => item.text).includes(ele[column.prop])) {
            list.push({
              text: ele[column.prop],
              value: ele[column.prop],
            });
          }
        });
      }
      return list;
    },
    getColumnProp(column, type, params) {
      let obj = column || {};
      if (type === "filterMethod") return this.handleFilterMethod(params);
      if (this.crud.isMobile && ["fixed"].includes(type)) return false;
      let result = obj?.[type];
      if (type == "width" && result == 0) {
        return undefined;
      }
      if (type == "filters") return this.handleFilters(column);
      if (type == "hide") return obj?.hide !== true;
      else return result;
    },
  },
});

export { script as default };
