/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_locale = require('../../../../src/core/locale.js');
var src_core_create = require('../../../../src/core/create.js');

var script = src_core_create.default({
  name: "crud",
  mixins: [src_core_locale.default],
  inject: ["crud"],
  data () {
    return {
      box: false,
      columnObj: {},
      symbolDic: [
        {
          label: "=",
          value: "="
        },
        {
          label: "≠",
          value: "≠"
        },
        {
          label: "like",
          value: "like"
        },
        {
          label: ">",
          value: ">"
        },
        {
          label: "≥",
          value: "≥"
        },
        {
          label: "<",
          value: "<"
        },
        {
          label: "≤",
          value: "≤"
        },
        {
          label: "∈",
          value: "∈"
        }
      ],
      list: [],
      columnOption: {}
    }
  },
  methods: {
    handleShow () {
      this.getColumnOption();
      this.box = true;
    },
    getColumnOption () {
      let result = [];
      let column = this.deepClone(this.crud.propOption);
      column.forEach(ele => {
        if (ele.showColumn !== false) result.push(Object.assign(ele, {
          value: ele.prop
        }));
      });
      this.columnOption = result;
      this.columnObj = this.columnOption[0];
    },
    handleDelete (index) {
      this.list.splice(index, 1);
    },
    handleClear () {
      this.list = [];
    },
    handleValueClear () {
      this.list.forEach((ele, index) => ele.value = '');
    },
    handleSubmit () {
      let result = [];
      this.list.forEach(ele => {
        result.push([ele.text, ele.symbol, ele.value]);
      });
      this.crud.$emit("filter", result);
      this.box = false;
    },
    handleChange (index) {
      this.list[index].value = '';
    },
    handleAdd () {
      const prop = this.columnObj.prop;
      this.list.push({
        text: prop,
        value: '',
        symbol: this.symbolDic[0].value
      });
    }
  }
});

exports.default = script;
