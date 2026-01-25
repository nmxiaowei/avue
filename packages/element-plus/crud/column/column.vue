<template>
  <slot name="header"></slot>
  <!-- 动态列 -->
  <template v-for="column in list" :key="column.prop">
    <column-dynamic
      v-if="column.children && column.children.length > 0"
      :columnOption="column"
    >
      <template v-for="item in crud.mainSlot" #[item]="scope">
        <slot v-bind="scope" :name="item"></slot>
      </template>
    </column-dynamic>
    <column-slot
      v-else
      :key="column.prop"
      :column="column"
      :column-option="columnOption"
    >
      <template v-for="item in crud.mainSlot" #[item]="scope">
        <slot v-bind="scope" :name="item"></slot>
      </template>
    </column-slot>
  </template>
  <slot name="footer"></slot>
</template>

<script>
import create from "core/create";
import columnDynamic from "./column-dynamic";
import columnSlot from "./column-slot";
import { arraySort } from "utils/util";
import { DIC_PROPS } from "global/variable";
export default create({
  name: "crud",
  data() {
    return {};
  },
  components: {
    columnSlot,
    columnDynamic,
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
</script>
