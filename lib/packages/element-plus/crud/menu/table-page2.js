/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var packages_elementPlus_crud_config = require('../config.js');
var src_core_create = require('../../../../src/core/create.js');

var script = src_core_create.default({
  name: "crud",
  inject: ["crud"],
  props: {
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      config: packages_elementPlus_crud_config.default,
      defaultPage: {
        single: false,//简单分页
        total: 0, // 总页数
        pagerCount: 7,//超过多少条隐藏
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true // 背景颜色
      }
    };
  },
  created () {
    if (this.crud.isMobile) {
      this.defaultPage.layout = 'total, sizes, prev, pager, next';
    }
    this.pageInit();
    this.crud.$emit("on-load", this.defaultPage);
  },
  watch: {
    'crud.page': {
      handler () {
        this.pageInit();
      },
      deep: true,
    },
    pageFlag () {
      this.crud.getTableHeight();
    },
  },
  computed: {
    pageFlag () {
      return this.defaultPage.total != 0
    }
  },
  methods: {
    pageInit () {
      this.defaultPage = Object.assign(this.defaultPage, this.crud.page);
      this.updateValue();
    },
    updateValue () {
      this.crud.$emit('update:page', this.defaultPage);
    },
    //下一页事件
    nextClick (val) {
      this.crud.$emit("next-click", val);
    },
    //上一页事件
    prevClick (val) {
      this.crud.$emit("prev-click", val);
    },
    // 页大小回调
    sizeChange (val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("size-change", val);
    },
    // 页码回调
    currentChange (val) {
      this.defaultPage.currentPage = val;
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("current-change", val);
    }
  }
});

exports.default = script;
