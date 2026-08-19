/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';

var script = create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data() {
    return {
      data: [],
      columnBox: false,
      triggerRef: null,
      columnSnapshot: null,
      confirmed: false,
      columnSortable: null,
    };
  },
  computed: {
    isAllVisible() {
      return (
        this.data.length > 0 &&
        this.data.every((column) => this.isVisible(column))
      );
    },
    isIndeterminate() {
      const visibleCount = this.data.filter((column) =>
        this.isVisible(column),
      ).length;
      return visibleCount > 0 && visibleCount < this.data.length;
    },
  },
  beforeUnmount() {
    this.destroySortable();
  },
  methods: {
    handleShow(triggerRef) {
      if (triggerRef) this.triggerRef = triggerRef;
      if (!this.triggerRef) return;
      this.destroySortable();
      this.data = this.crud.propOption.filter(
        (column) => column.showColumn !== false,
      );
      this.columnSnapshot = this.crud.deepClone(this.crud.tableOption.column);
      this.confirmed = false;
      this.columnBox = true;
      this.$nextTick(() => this.rowDrop());
    },
    isVisible(column) {
      return this.crud.objectOption[column.prop]?.hide !== true;
    },
    isFixed(column, position) {
      const fixed = this.crud.objectOption[column.prop]?.fixed;
      return position === "left"
        ? fixed === true || fixed === "left"
        : fixed === "right";
    },
    isLegacyEnabled(column, prop) {
      return this.crud.objectOption[column.prop]?.[prop] === true;
    },
    handleCheckAll(visible) {
      this.data.forEach((column) => {
        this.crud.objectOption[column.prop].hide = !visible;
      });
      this.handleChange("hide");
    },
    handleVisibleChange(column, visible) {
      this.crud.objectOption[column.prop].hide = !visible;
      this.handleChange("hide");
    },
    handleFixedChange(column, position) {
      const target = this.crud.objectOption[column.prop];
      target.fixed = this.isFixed(column, position) ? false : position;
      this.handleChange("fixed");
    },
    handleLegacyChange(column, prop) {
      const target = this.crud.objectOption[column.prop];
      target[prop] = !this.isLegacyEnabled(column, prop);
      this.handleChange(prop);
    },
    handleChange(prop) {
      if (prop === "hide") {
        this.crud.gridShow ? this.crud.refreshTable() : this.crud.doLayout();
      } else if (prop === "filters") {
        this.crud.refreshTable();
      }
      this.crud.saveColumnState(prop);
    },
    handleConfirm() {
      this.confirmed = true;
      this.columnBox = false;
    },
    handleCancel() {
      this.restoreColumn();
      this.confirmed = true;
      this.columnBox = false;
    },
    handleHide() {
      if (!this.confirmed) this.restoreColumn();
      this.destroySortable();
      this.data = [];
    },
    handleReset() {
      if (!this.crud.columnStateEnabled) return;
      this.crud.resetColumnState(() => {
        this.data = this.crud.propOption.filter(
          (column) => column.showColumn !== false,
        );
        this.$nextTick(() => this.rowDrop());
      });
    },
    restoreColumn() {
      if (!this.columnSnapshot) return;
      this.crud.tableOption.column = this.crud.deepClone(this.columnSnapshot);
      this.crud.refreshTable(() => this.crud.doLayout());
      this.crud.saveColumnState("cancel");
    },
    destroySortable() {
      if (this.columnSortable) this.columnSortable.destroy();
      this.columnSortable = null;
    },
    rowDrop() {
      if (!this.$refs.list) return;
      this.destroySortable();
      this.columnSortable = this.crud.tableDrop(
        "column",
        this.$refs.list,
        (evt) => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          if (oldIndex === newIndex) return;
          const column = this.data.splice(oldIndex, 1)[0];
          this.data.splice(newIndex, 0, column);
          this.sortColumn(oldIndex, newIndex);
        },
      );
    },
    sortColumn(oldIndex, newIndex) {
      this.crud.headerSort(oldIndex, newIndex);
    },
  },
});

export { script as default };
