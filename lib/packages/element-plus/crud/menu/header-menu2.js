/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
var src_core_locale = require('../../../../src/core/locale.js');
require('../../../../src/plugin/logs/index.js');
var packages_core_directive_permission = require('../../../core/directive/permission.js');
require('../../../../src/global/variable.js');
require('lodash/get');
require('lodash/set');
require('lodash/cloneDeep');
var packages_elementPlus_crud_config = require('../config.js');

var script = src_core_create.default({
  name: "crud",
  mixins: [src_core_locale.default],
  directives: {
    permission: packages_core_directive_permission.default
  },
  inject: ["crud"],
  data () {
    return {
      dateCreate: false,
      printLoading: false,
      shortcuts: [
        {
          text: this.t('date.t'),
          value: new Date(),
        },
        {
          text: this.t('date.y'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: this.t('date.n'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
      config: packages_elementPlus_crud_config.default
    };
  },
  created () {
    this.initFun();

  },
  computed: {
    data () {
      if (this.crud.tableOption.selection) {
        return this.crud.tableSelect;
      } else {
        return this.crud.list;
      }
    }
  },
  methods: {
    //日期组件回调
    dateChange (val) {
      if (this.dateCreate) {
        this.crud.$emit("date-change", val);
      } else {
        this.dateCreate = true;
      }

    },
    initFun () {
      this.crud.rowExcel = this.rowExcel;
      this.crud.rowPrint = this.rowPrint;
    },
    rowExcel () {
      this.crud.$refs.dialogExcel.handleShow();
    },
    rowPrint () {
      if (this.printLoading) return
      this.printLoading = true;
      try {
        this.$Print(this.crud.$refs.table, {
          title: this.crud.tableOption.title,
          hiddenColumnLabels: [this.crud.tableOption.menuTitle || this.t('crud.menu')],
          onReady: () => { this.printLoading = false; },
          onError: () => { this.printLoading = false; }
        });
      } catch {
        this.printLoading = false;
      }
    }
  }
});

exports.default = script;
