<template>
  <el-popover
    v-if="triggerRef"
    v-model:visible="columnBox"
    :virtual-ref="triggerRef"
    virtual-triggering
    placement="bottom-end"
    :width="crud.isMobile ? 320 : 320"
    popper-class="avue-crud__column-popper"
    @hide="handleHide"
  >
    <div class="avue-crud__column-panel">
      <div class="avue-crud__column-panel__header">
        <el-checkbox
          :model-value="isAllVisible"
          :indeterminate="isIndeterminate"
          @change="handleCheckAll"
        >
          {{ t("crud.column.all") }}
        </el-checkbox>
      </div>
      <div ref="list" class="avue-crud__column-panel__list">
        <div
          v-for="column in data"
          :key="column.prop"
          class="avue-crud__column-panel__item"
        >
          <el-checkbox
            :model-value="isVisible(column)"
            :aria-label="column.label"
            @change="handleVisibleChange(column, $event)"
          />
          <span class="avue-crud__column-panel__drag" aria-hidden="true"
            >⠿</span
          >
          <span class="avue-crud__column-panel__label">{{ column.label }}</span>
          <div class="avue-crud__column-panel__actions">
            <el-tooltip :content="t('crud.column.fixedLeft')" placement="top">
              <el-button
                text
                circle
                icon="el-icon-d-arrow-left"
                :class="{ 'is-active': isFixed(column, 'left') }"
                :aria-label="t('crud.column.fixedLeft')"
                @click="handleFixedChange(column, 'left')"
              />
            </el-tooltip>
            <el-tooltip :content="t('crud.column.fixedRight')" placement="top">
              <el-button
                text
                circle
                icon="el-icon-d-arrow-right"
                :class="{ 'is-active': isFixed(column, 'right') }"
                :aria-label="t('crud.column.fixedRight')"
                @click="handleFixedChange(column, 'right')"
              />
            </el-tooltip>
            <el-tooltip :content="t('crud.column.filters')" placement="top">
              <el-button
                text
                circle
                icon="el-icon-filter"
                :class="{ 'is-active': isLegacyEnabled(column, 'filters') }"
                :aria-label="t('crud.column.filters')"
                @click="handleLegacyChange(column, 'filters')"
              />
            </el-tooltip>
            <el-tooltip :content="t('crud.column.sortable')" placement="top">
              <el-button
                text
                circle
                icon="el-icon-sort"
                :class="{ 'is-active': isLegacyEnabled(column, 'sortable') }"
                :aria-label="t('crud.column.sortable')"
                @click="handleLegacyChange(column, 'sortable')"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="avue-crud__column-panel__footer">
        <el-button
          text
          :disabled="!crud.columnStateEnabled"
          @click="handleReset"
        >
          {{ t("crud.column.restore") }}
        </el-button>
        <span class="avue-crud__column-panel__footer-actions">
          <el-button text @click="handleCancel">{{
            t("crud.column.cancel")
          }}</el-button>
          <el-button text type="primary" @click="handleConfirm">{{
            t("crud.column.confirm")
          }}</el-button>
        </span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import create from "core/create";
import locale from "core/locale";

export default create({
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
      this.triggerRef = null;
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
</script>
