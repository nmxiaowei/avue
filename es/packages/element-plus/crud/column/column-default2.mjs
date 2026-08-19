/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';
import config from '../config.mjs';
import '../grid/item.mjs';
import script$1 from '../grid/item2.mjs';

var script = create({
  name: "crud",
  data () {
    return {
      config: config,
      rowSortable: null,
      columnSortable: null,
    }
  },
  components: {
    tableItemCard: script$1
  },
  mixins: [locale],
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

export { script as default };
