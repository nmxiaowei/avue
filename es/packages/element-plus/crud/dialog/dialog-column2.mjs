/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';
import '../../../../src/plugin/logs/index.mjs';
import config from '../config.mjs';

var script = create({
  name: 'crud',
  mixins: [locale],
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
      const el = this.$refs.table.$el.querySelectorAll(config.dropRowClass)[0];
      this.crud.tableDrop('column', el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        this.crud.headerSort(oldIndex, newIndex);
      });
    },
  }
});

export { script as default };
