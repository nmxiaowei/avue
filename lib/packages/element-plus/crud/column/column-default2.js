/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
var src_core_locale = require('../../../../src/core/locale.js');
var packages_elementPlus_crud_config = require('../config.js');
require('../grid/item.js');
var item_vue_vue_type_script_lang = require('../grid/item2.js');

var script = src_core_create.default({
  name: "crud",
  data () {
    return {
      config: packages_elementPlus_crud_config.default,
      rowSortable: null,
      columnSortable: null,
    }
  },
  components: {
    tableItemCard: item_vue_vue_type_script_lang.default
  },
  mixins: [src_core_locale.default],
  inject: ["crud"],
  watch: {
    'crud.isSortable' (val) {
      this.rowDrop(val);
      this.columnDrop(val);
    },
    'crud.isRowSort' (val) {
      this.rowDrop(val);
    },
    'crud.isColumnSort' (val) {
      this.columnDrop(val);
    }
  },
  mounted () {
    this.rowDrop();
    this.columnDrop();
  },
  methods: {
    indexMethod (index) {
      return (
        index +
        1 +
        ((this.crud.page.currentPage || 1) - 1) *
        (this.crud.page.pageSize || 10)
      );
    },
    rowDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.rowSortable && this.rowSortable.destroy();
          return
        }
        if (!this.crud.$refs.table.$el) return
        const el = this.crud.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0];
        this.rowSortable = this.crud.tableDrop('row', el, evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          this.crud.$emit('sortable-change', oldIndex, newIndex);
        });
      });
    },
    columnDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.columnSortable && this.columnSortable.destroy();
          return
        }
        if (!this.crud.$refs.table.$el) return
        const el = this.crud.$refs.table.$el.querySelector(this.config.dropColClass);
        let noIndexCount = 0;
        ['selection', 'index', 'expand'].forEach(ele => {
          if (this.crud.tableOption[ele]) { noIndexCount += 1; }
        });
        this.columnSortable = this.crud.tableDrop('column', el, evt => {
          const newIndex = evt.newIndex - noIndexCount;
          const oldIndex = evt.oldIndex - noIndexCount;
          this.crud.headerSort(oldIndex, newIndex);
          this.crud.$emit('column-sortable-change', oldIndex, newIndex);
        });
      });
    },
  }
});

exports.default = script;
