/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
var src_core_locale = require('../../../../src/core/locale.js');
require('../../../../src/plugin/logs/index.js');
var packages_elementPlus_crud_config = require('../config.js');

var script = src_core_create.default({
  name: 'crud',
  mixins: [src_core_locale.default],
  inject: ["crud"],
  data () {
    return {
      data: [],
      columnBox: false
    };
  },
  computed: {
    defaultColumn () {
      return [{
        label: this.t('crud.column.hide'),
        prop: 'hide'
      }, {
        label: this.t('crud.column.fixed'),
        prop: 'fixed'
      }, {
        label: this.t('crud.column.filters'),
        prop: 'filters'
      }, {
        label: this.t('crud.column.sortable'),
        prop: 'sortable'
      }, {
        label: this.t('crud.column.width'),
        prop: 'width',
        hide: true
      }]
    }
  },
  methods: {
    handleShow () {
      this.data = [];
      this.crud.propOption.forEach(column => {
        if (column.showColumn != false) this.data.push(column);
      });
      this.columnBox = true;
      this.$nextTick(() => this.rowDrop());
    },
    handleChange (prop) {
      if (prop === 'hide') {
        this.crud.gridShow ? this.crud.refreshTable() : this.crud.doLayout();
      } else if (prop === 'filters') {
        this.crud.refreshTable();
      }
    },
    rowDrop () {
      const el = this.$refs.table.$el.querySelectorAll(packages_elementPlus_crud_config.default.dropRowClass)[0];
      this.crud.tableDrop('column', el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        this.crud.headerSort(oldIndex, newIndex);
      });
    },
  }
});

exports.default = script;
